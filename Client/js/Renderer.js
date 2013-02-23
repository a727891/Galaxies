/**
 * Renderer class
 **/
define(['SimplexNoise', 'TileData'], function (Simplex, TileData) {
    var Renderer = Class.extend({
        init:function () {
            this.TileData = new TileData();
            this.LoadCanvas('TestCanvas');
            this.Simplex = new Simplex(this.Canvas, this.Context);
            this.Simplex.config.color = true;
            this.Simplex.config.colorlevels = this.TileData.WorldTiles;
            this.Simplex.GenImage(null);
//            this.Simplex.InsertControls();
            this.WorldTiles = {
                tiles:this.Simplex.TilesData,
                width:this.Canvas.width,
                height:this.Canvas.height
            };
            this.Simplex.config.color = true;
            this.GenTileMap();
            this.RenderWorldSetup();
//            this.RenderWorld(0,0)

        },
        LoadCanvas:function (canvas) {
            this.Canvas = document.getElementById(canvas);
            this.Context = this.Canvas.getContext('2d');
        },

        RenderWorldSetup:function () {
            this.LoadCanvas('WorldRender');
            this.WorldRender = {
                worldCanvas:this.Canvas,
                worldContext:this.Context,
                tilesX:Math.floor(this.Canvas.width / 32),
                tilesY:Math.floor(this.Canvas.height / 32),
                posX:0,
                posY:0
            };
            console.dir(this.WorldRender);
        },
        RenderWorld:function (x, y) {
            var i, j;
            for (j = 0; j < this.WorldRender.tilesY; j++) {
                for (i = 0; i < this.WorldRender.tilesX; i++) {
                    this.DrawTile(x + i, y + j, this.TilePositions[this.GetTileByWorldCoords(x + i, y + j)]);
                }
            }
        },
        DrawTile:function (x, y, TilePosition) {
//            console.log("Draw tile",x,y,TilePosition);
            this.Context.drawImage(this.TileMapCanvas,
                TilePosition.x, TilePosition.y, 32, 32,
                x * 32, y * 32, 32, 32);

        },
        GenTileMap:function () {
            this.LoadCanvas('TileMap');
            this.TileMapCanvas = this.Canvas;
            this.TileMapContext = this.Context;

            this.LoadCanvas('Tile');
            this.Simplex.LoadCanvas(this.Canvas, this.Context);

            var tm_h = this.TileMapCanvas.height,
                tm_w = this.TileMapCanvas.width,
                t_h = this.Canvas.height,
                t_w = this.Canvas.width,
                max_x = tm_w / t_w,
                max_y = tm_h / t_h,
                tile_x,
                tile_y,
                i, j;

            //Generate Terrain tiles
            for (i = 0, j = this.TileData.Tiles.length; i < j; i++) {
                console.log("Generate tile called: " + this.TileData.Tiles[i].name);
                this.Simplex.config.colorlevels = this.TileData.Tiles[i].colors;
                this.Simplex.GenImage(this.TileData.Tiles[i].seed);
                tile_y = t_h * Math.floor(i / max_y);
                tile_x = t_w * (i % max_y);
                console.log(i, "X:", tile_x, "Y:", tile_y);
//            context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
                this.TileMapContext.drawImage(this.Canvas,
                    0, 0, t_w, t_h,
                    tile_x, tile_y, t_w, t_h);
            }

            var tileCount = i,
                SourceX, SourceY, SourceX2, SourceY2;
            var maxX = this.Canvas.width,
                midX = maxX / 2,
                maxY = this.Canvas.height,
                midY = maxY / 2,
                CircleLeft = Math.PI,
                CircleUp = 1.5 * Math.PI,
                CircleRight = 0,
                CircleDown = 0.5 * Math.PI;
            var PathsControl = this.PathsControl(maxX, midX, maxY, midY,
                CircleLeft, CircleUp, CircleRight, CircleDown);
            //Generate transition tiles.
            for (i = 0, j = this.TileData.Tiles.length - 1; i < j; i++) {
                SourceX = t_h * Math.floor(i / max_y);
                SourceY = t_w * (i % max_y);
                SourceX2 = t_h * Math.floor((i + 1) / max_y);
                SourceY2 = t_w * ((i + 1) % max_y);

                for (k = 0, l = PathsControl.length; k < l; k++) {
                    tile_y = t_h * Math.floor(tileCount / max_y);
                    tile_x = t_w * (tileCount % max_y);
                    tileCount++;

                    this.TileMapContext.drawImage(this.TileMapCanvas,
                        SourceY, SourceX, t_w, t_h,
                        tile_x, tile_y, t_w, t_h);

                    this.Context.save();
                    this.Context.clearRect(0, 0, maxX, maxY);
                    this.Context.fillStyle = 'white';
                    this.Paths[PathsControl[k][0]](this.Context, PathsControl[k][1]);
                    this.Context.globalCompositeOperation = 'source-in';
                    this.Context.drawImage(this.TileMapCanvas,
                        SourceY2, SourceX2, t_w, t_h,
                        0, 0, t_w, t_h);
                    this.Context.restore();

                    this.TileMapContext.drawImage(this.Canvas,
                        0, 0, t_w, t_h,
                        tile_x, tile_y, t_w, t_h);
                }

            }
            this.ComputeTileLocations(tileCount, t_w, t_h, max_x);

        },
        ComputeTileLocations:function (tileCount, t_w, t_h, max_y) {
            console.log('compute positions,', tileCount, t_w, t_h, max_y);
            this.TilePositions = [];
            for (var i = 0; i <= tileCount; i++) {
                tile_y = t_h * Math.floor(i / max_y);
                tile_x = t_w * (i % max_y);
                this.TilePositions[i] = {x:tile_x, y:tile_y};
            }
        },
        GetTileByWorldCoords:function (x, y) {
            return this.WorldTiles.tiles[x * this.WorldTiles.width + y];
        },

        PathsControl:function (maxX, midX, maxY, midY, CircleLeft, CircleUp, CircleRight, CircleDown) {
            return [
                [0, [maxX, 0, midX, CircleDown, CircleLeft], 'UpperRightCorner'],
                [0, [0, 0, midX, CircleLeft, CircleDown], 'UpperLeftCorner'],
                [0, [maxX, maxY, midX, CircleRight, CircleUp], 'LowerRightCorner'],
                [0, [0, maxY, midX, CircleUp, CircleLeft], 'LowerLeftCorner'],
                [1, [0, 0, maxX, midY], 'TopBottom'],
                [1, [0, midX, maxX, midY], 'BottomTop'],
                [1, [midX, 0, maxX, maxY], 'RightLeft'],
                [1, [0, 0, midX, maxY], 'LeftRight'],
                [2, [maxX, 0, midX, CircleDown, CircleLeft, 0, 0, 0, maxY, maxX, maxY], 'UpperRightCorner2'],
                [2, [0, 0, midX, CircleLeft, CircleDown, 0, maxY, maxX, maxY, maxX, 0], 'UpperLeftCorner2'],
                [2, [maxX, maxY, midX, CircleRight, CircleUp, maxX, 0, 0, 0, 0, maxY], 'LowerRightCorner2'],
                [2, [0, maxY, midX, CircleUp, CircleLeft, maxX, maxY, maxX, 0, 0, 0], 'LowerLeftCorner2']
            ];
        },
        Paths:[
            function (ctx, arr) {
                //arr = x, y, r, aS, aE
                ctx.beginPath();
                ctx.moveTo(arr[0], arr[1]);
                ctx.arc(arr[0], arr[1], arr[2], arr[3], arr[4], false);
                ctx.fill();
                ctx.closePath();
            },
            function (ctx, arr) {
                //arr = x1, y1, x2, y2
                ctx.beginPath(); //TopBottom
                ctx.rect(arr[0], arr[1], arr[2], arr[3]);
                ctx.fill();
                ctx.closePath();
            },
            function (ctx, arr) {
                //arr =  aX, aY, aR, aS, aE, l1X, l1Y, l2X, l2Y, l3X, l3Y
                ctx.beginPath();
                ctx.moveTo(arr[0], arr[1]);
                ctx.arc(arr[0], arr[1], arr[2], arr[3], arr[4], false);
                ctx.lineTo(arr[5], arr[6]);
                ctx.lineTo(arr[7], arr[8]);
                ctx.lineTo(arr[9], arr[10]);
                ctx.fill();
                ctx.closePath();
            }
        ]


    });

    return Renderer;
})
;

