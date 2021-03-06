/**
 * TileData class
 **/
define([], function () {
    var TileData = Class.extend({
        init:function () {
            this.WorldTiles = [
                {'v':64, 'r':0, 'g':0, 'b':128, 't':0},
                //DeepWater
                {'v':96, 'r':0, 'g':0, 'b':224, 't':1},
                //Water
                {'v':110, 'r':255, 'g':246, 'b':191, 't':2},
                //Sand
                {'v':180, 'r':64, 'g':128, 'b':64, 't':3},
                //Grass
                {'v':220, 'r':64, 'g':64, 'b':64, 't':4},
                //Rock
                {'v':256, 'r':224, 'g':224, 'b':224, 't':5},
                //Snow
//                {'v':224, 'r':224, 'g':224, 'b':224, 't':6},
//                {'v':256, 'r':255, 'g':255, 'b':255, 't':7},
            ];
            /**
             * {
             *   id: index number for the tile
             *   name: a description of the tile
             *   colors:{
             *      'v':threshold of noise function to apply this tile
             *      'r','g','b': RBG value between 0-255 of the pixel
             *   }
             *   seed: the Noise function seed for the tile
             * }
             * @type {Array}
             */
            this.Tiles = [
                {'id':0,
                    'name':'DeepWater',
                    'colors':[
                        {'v':64, 'r':0, 'g':0, 'b':96},
                        {'v':128, 'r':0, 'g':0, 'b':64},
                        {'v':192, 'r':0, 'g':0, 'b':150},
                        {'v':256, 'r':0, 'g':0, 'b':128},
                    ],
                    'seed':null,
                },
                {'id':1,
                    'name':'Water',
                    'colors':[
                        {'v':64, 'r':0, 'g':0, 'b':150},
                        {'v':128, 'r':0, 'g':62, 'b':128},
                        {'v':192, 'r':0, 'g':0, 'b':200},
                        {'v':256, 'r':0, 'g':0, 'b':96},
                    ],
                    'seed':null,
                },
                {'id':2,
                    'name':'Sand',
                    'colors':[
                        {'v':128, 'r':250, 'g':250, 'b':191},
                        {'v':256, 'r':250, 'g':250, 'b':240},
//                        {'v':96, 'r':96, 'g':0, 'b':96},
//                        {'v':128, 'r':0, 'g':0, 'b':128},
//                        {'v':160, 'r':0, 'g':160, 'b':160},
//                        {'v':192, 'r':192, 'g':0, 'b':192},
//                        {'v':224, 'r':0, 'g':0, 'b':224},
//                        {'v':256, 'r':0, 'g':255, 'b':255},
                    ],
                    'seed':null,
                },
                {'id':3,
                    'name':'Grass',
                    'colors':[
                        {'v':96, 'r':0, 'g':64, 'b':32},
                        {'v':196, 'r':0, 'g':96, 'b':64},
                        {'v':256, 'r':96, 'g':128, 'b':96},
//                        {'v':128, 'r':0, 'g':0, 'b':128},
//                        {'v':160, 'r':0, 'g':160, 'b':160},
//                        {'v':192, 'r':192, 'g':0, 'b':192},
//                        {'v':224, 'r':0, 'g':0, 'b':224},
//                        {'v':256, 'r':0, 'g':255, 'b':255},
                    ],
                    'seed':null,
                },
                {'id':4,
                    'name':'Rock',
                    'colors':[
                        {'v':128, 'r':64, 'g':64, 'b':64},
                        {'v':256, 'r':96, 'g':96, 'b':96},
//                        {'v':96, 'r':96, 'g':0, 'b':96},
//                        {'v':128, 'r':0, 'g':0, 'b':128},
//                        {'v':160, 'r':0, 'g':160, 'b':160},
//                        {'v':192, 'r':192, 'g':0, 'b':192},
//                        {'v':224, 'r':0, 'g':0, 'b':224},
//                        {'v':256, 'r':0, 'g':255, 'b':255},
                    ],
                    'seed':null,
                },
                {'id':5,
                    'name':'Snow',
                    'colors':[
                        {'v':32, 'r':200, 'g':200, 'b':200},
                        {'v':255, 'r':255, 'g':255, 'b':255},
//                        {'v':96, 'r':96, 'g':0, 'b':96},
//                        {'v':128, 'r':0, 'g':0, 'b':128},
//                        {'v':160, 'r':0, 'g':160, 'b':160},
//                        {'v':192, 'r':192, 'g':0, 'b':192},
//                        {'v':224, 'r':0, 'g':0, 'b':224},
//                        {'v':256, 'r':0, 'g':255, 'b':255},
                    ],
                    'seed':null,
                },


            ];
        },


    });

    return TileData;
})
;