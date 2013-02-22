/**
 * Renderer class
 **/
define(['SimplexNoise', 'TileData'], function (Simplex, TileData) {
    var Renderer = Class.extend({
        init:function () {
//            this.Canvas = document.getElementById('TestCanvas');
//            this.Context = this.Canvas.getContext('2d');
            this.TileData = new TileData();
            this.LoadCanvas('TestCanvas');
            this.Simplex = new Simplex(this.Canvas, this.Context);
            this.Simplex.config.color = false;
//            this.Simplex.config.colorlevels = this.TileData.WorldTiles;
//            this.Simplex.GenImage(null);
//            this.Simplex.InsertControls();
//            var Tiles = this.Simplex.TilesData;
            this.Simplex.config.color = true;
            this.GenTileMap();

        },
        LoadCanvas:function (canvas) {
            this.Canvas = document.getElementById(canvas);
            this.Context = this.Canvas.getContext('2d');
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

            console.log("MaxX:" + max_x, "MaxY:" + max_y, 'tW:' + t_w, 'tH:' + t_h);
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
            var Paths = [
                //TODO: Clean up this shit.
                function (ctx) {
                    ctx.beginPath(); //UpperLeftCorner
                    ctx.moveTo(0, 0);
                    ctx.arc(0, 0, midX, CircleLeft, CircleDown, false);
                    ctx.fill();
                    ctx.closePath();
                },
                function (ctx) {
                    ctx.beginPath(); //LowerLeftCorner
                    ctx.moveTo(0, maxY);
                    ctx.arc(0, maxY, midX, CircleUp, CircleLeft, false);
                    ctx.fill();
                    ctx.closePath();
                },
                function (ctx) {
                    ctx.beginPath(); //LowerRightCorner
                    ctx.moveTo(maxX, maxY);
                    ctx.arc(maxX, maxY, midX, CircleRight, CircleUp, false);
                    ctx.fill();
                    ctx.closePath();
                },
                function (ctx) {
                    ctx.beginPath(); //UpperRightCorner
                    ctx.moveTo(maxX, 0);
                    ctx.arc(maxX, 0, midX, CircleDown, CircleLeft, false);
                    ctx.fill();
                    ctx.closePath();
                },
                function (ctx) {
                    ctx.beginPath(); //TopBottom
                    ctx.rect(0, 0, maxX, midY);
                    ctx.fill();
                    ctx.closePath();
                },
                function (ctx) {
                    ctx.beginPath(); //LeftRight
                    ctx.rect(0, 0, midX, maxY);
                    ctx.fill();
                    ctx.closePath();
                },
                function (ctx) {
                    ctx.beginPath(); //RightLeft
                    ctx.rect(midX, 0, maxX, maxY);
                    ctx.fill();
                    ctx.closePath();
                },
                function (ctx) {
                    ctx.beginPath(); //BottomTop
                    ctx.rect(0, midX, maxX, midY);
                    ctx.fill();
                    ctx.closePath();
                },
                function (ctx) {
                    ctx.beginPath(); //UpperLeftCorner
                    ctx.fillStyle = 'black';
                    ctx.moveTo(midX, 0);
                    ctx.arc(0, 0, midX, CircleLeft, CircleDown, false);
                    ctx.lineTo(0, maxY);
                    ctx.lineTo(maxX, maxY);
                    ctx.lineTo(maxX, 0);
//                    ctx.lineTo(midX,0);
                    ctx.fill();
                    ctx.closePath();
                },
                function (ctx) {
                    ctx.beginPath(); //LowerLeftCorner
                    ctx.moveTo(0, midY);
                    ctx.arc(0, maxY, midX, CircleUp, CircleLeft, false);
                    ctx.lineTo(maxX, maxY);
                    ctx.lineTo(maxX, 0);
                    ctx.lineTo(0, 0);
                    ctx.fill();
                    ctx.closePath();
                },
                function (ctx) {
                    ctx.beginPath(); //LowerRightCorner
//                    ctx.moveTo(maxX, maxY);
                    ctx.arc(maxX, maxY, midX, CircleRight, CircleUp, false);
                    ctx.lineTo(maxX, midY);
                    ctx.lineTo(maxX, 0);
                    ctx.lineTo(0, 0);
                    ctx.lineTo(0, maxY);
                    ctx.fill();
                    ctx.closePath();
                },
                function (ctx) {
                    ctx.beginPath(); //UpperRightCorner
//                    ctx.moveTo(maxX, 0);
                    ctx.arc(maxX, 0, midX, CircleDown, CircleLeft, false);
                    ctx.lineTo(0, 0);
                    ctx.lineTo(0, maxY);
                    ctx.lineTo(maxX, maxY);
                    ctx.fill();
                    ctx.closePath();
                },
            ];

            for (i = 0, j = this.TileData.Tiles.length - 1; i < j; i++) {
                SourceX = t_h * Math.floor(i / max_y);
                SourceY = t_w * (i % max_y);
                SourceX2 = t_h * Math.floor((i + 1) / max_y);
                SourceY2 = t_w * ((i + 1) % max_y);
                for (k = 0, l = Paths.length; k < l; k++) {
                    tile_y = t_h * Math.floor(tileCount / max_y);
                    tile_x = t_w * (tileCount % max_y);
                    tileCount++;

                    this.TileMapContext.drawImage(this.TileMapCanvas,
                        SourceY, SourceX, t_w, t_h,
                        tile_x, tile_y, t_w, t_h);

                    this.Context.save();
                    this.Context.clearRect(0, 0, maxX, maxY);
//                    this.Context.drawImage(this.TileMapCanvas,
//                        SourceY, SourceX, t_w, t_h,
//                        0, 0, t_w, t_h);
                    this.Context.fillStyle = 'white';
                    Paths[k % (Paths.length)](this.Context);
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

        }


    });

    return Renderer
});

