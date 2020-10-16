<template>

</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
  name: "App",
  data() {
    return {
      
    };
  },
  methods: {
    loadMap() {
      let mapDiv = document.getElementById("app");
      mapboxgl.accessToken =
        "pk.eyJ1IjoieGFnZW90aW1lIiwiYSI6ImNrZW53cWNwdTAzZnQyc29pZmxiaG9ldDMifQ.wLTACennW-9IBHOdC8O5Gg";
      let bounds = [
        [117.335, 38.488], // Southwest coordinates
        [119.287, 39.413], // Northeast coordinates
      ];

      var map = new mapboxgl.Map({
        container: mapDiv, // container id 绑定的组件的id
        style: "mapbox://styles/xageotime/ckff44eha0w9s19pik4arylnc", //地图样式，可以使用官网预定义的样式,也可以自定义
        center: [118.311, 38.951], // 初始坐标系
        minZoom: 8.5,
        maxZoom: 20,
        pitch: 35,
        bearing: 0,
        maxBounds: bounds, // Sets bounds as max
        antialias: false, //抗锯齿，通过false关闭提升性能
      });
       
      window.tb =new Threebox(map,map.getCanvas().getContext("webgl"), {
        defaultLights: true,
        enableSelectingObjects: true,
        enableTooltips: true,
      });

      // parameters to ensure the model is georeferenced correctly on the map
      var modelOrigin = [
        [117.98311991, 38.767527],
        [117.973602066, 38.7829939],
        [117.964084222, 38.8008398659],
        [117.94504853399999, 38.809167979400002],
        [117.930771768, 38.8222550149],
      ];

      let blnRefresh = false;
      let models = new Array();
      function createCustomLayer(layerName, origin) {
        let mdl;        
        //create the layer
        let customLayer3D = {
          id: layerName,
          type: "custom",
          renderingMode: "3d",
          onAdd: function(map, gl) {
            let options = {
              type: "gltf", //'gltf'/'mtl'
              //"https://raw.githubusercontent.com/luojiandan/TianJingGang/master/Freighter.glb", //./model/Freighter.glb", //model url
              obj:
                "https://raw.githubusercontent.com/luojiandan/TianJingGang/master/Freighter.glb",
              bin: "", //replace by mtl attribute
              units: "meters", //units in the default values are always in meters
              scale: 5, //船的大小
              rotation: { x: 90, y: 5, z: 0 }, //default rotation
              anchor: "center",
            };

            let i = 1;
            origin.forEach((el) => {
              tb.loadObj(options, function(model) {
                model.setCoords(el);
                model.addTooltip("冲锋号" + i, true);
                tb.add(model);
                models.push(model);

                i++;

                console.log(i);
              });
            });
          },

          render: function(gl, matrix) {
            tb.update();
          },
        };
        return customLayer3D;
      }

      map.on("load", function() {
        map.addLayer(
          createCustomLayer("3d-model", modelOrigin),
          "waterway-label"
        );

        map.setLayerZoomRange("3d-model", 0, 22);

        console.log(map);        
      });

      //AnchorageHighlited
    let lyrHighliteds = [
      "AnchorageHighlited1",
      "AnchorageHighlited2",
      "AnchorageHighlited3",
      "AnchorageHighlited4",
      "AnchorageHighlited5",
      "AnchorageHighlited6",
      "AnchorageHighlited7",
      "AnchorageHighlited8",
      "AnchorageHighlited9",
      "AnchorageHighlited10",
    ];
    var setHighlitedLyrs = function (filter) {
      lyrHighliteds.forEach((lyr) => {
        map.setFilter(lyr, filter);
      });
    };

    //点击切换选择
    map.on("click", function (e) {
      var bbox = [
        [e.point.x - 3, e.point.y - 3],
        [e.point.x + 3, e.point.y + 3],
      ];
      var features = map.queryRenderedFeatures(bbox, {
        layers: ["AnchoragePolygon"],
      });
      var filter;
      if (features.length == 0) {
        //点击空白处，不筛选
        filter = ["in", "ID", ""];

        setHighlitedLyrs(filter);
      } else {
        filter = features.reduce(
          function (memo, feature) {
            memo.push(feature.properties.ID);
            return memo;
          },
          ["in", "ID"]
        );

        console.log(filter);
        setHighlitedLyrs(filter);
      }
    });
    map.on("click", "AnchoragePolygon", function (e) {});
    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    map.on("mouseenter", "AnchoragePolygon", function () {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "AnchoragePolygon", function () {
      map.getCanvas().style.cursor = "";
    });

    map.on("click", "Wharf", function (e) {
      console.log(e.features[0].properties);
    });

    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    map.on("mouseenter", "Wharf", function () {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "Wharf", function () {
      map.getCanvas().style.cursor = "";
    });
    },
  },
mounted() {
    this.loadMap();
    setInterval(() => {
      this.date = new Date(); // 修改数据date
    }, 1000);
  },
};
</script>
<style lang='less' >
