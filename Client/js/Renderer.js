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
//            this.GenTileMap();

            this.Context.save();
            this.Context.fillStyle = 'white';
//            this.Context.clearRect(0,0, this.Canvas.width,this.Canvas.height);
            this.Context.arc(0, 0, this.Canvas.width / 2, 0, Math.PI, 0);
            this.Context.fill();
            this.Context.clear();
            this.Context.arc(0, this.Canvas.height, this.Canvas.width / 2, 3 * Math.PI, .5 * Math.PI, 0);
            this.Context.fill();
            this.Context.clear();
            this.Context.arc(this.Canvas.width, 0, this.Canvas.width / 2, 0, Math.PI, 1);
            this.Context.fill();
            this.Context.clear();
            this.Context.arc(this.Canvas.width, this.Canvas.height, this.Canvas.width / 2, Math.PI, 2 * Math.PI, 1);
            this.Context.fill();
            this.Context.clear();

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
                tile_y;

//            console.log("MaxX:" + max_x, "MaxY:" + max_y, 'tW:' + t_w, 'tH:' + t_h);
//            for (var i = 0; i < this.TileData.Tiles.length; i++) {
//                console.log("Generate tile called: " + this.TileData.Tiles[i].name);
//                this.Simplex.config.colorlevels = this.TileData.Tiles[i].colors;
//                this.Simplex.GenImage(this.TileData.Tiles[i].seed);
//                tile_y = t_h * Math.floor(i / max_y);
//                tile_x = t_w * (i % max_y);
//                console.log(i, "X:", tile_x, "Y:", tile_y);
////            context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
//                this.TileMapContext.drawImage(this.Canvas
//                    , 0, 0, t_w, t_h,
//                    tile_x, tile_y, t_w, t_h);
//            }

            this.Context.save();
            this.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
            this.Context.arc(0, 0, t_h / 2, 0, Math.PI, 0);
            this.Context.fill();


        }


    });

    return Renderer
});

