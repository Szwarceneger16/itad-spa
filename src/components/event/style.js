export default {
    table: {
        display: "block",
        colorScheme: "blackAlpha",
        variant: "striped",
        h: "400px",
        w: "100%",
        p: 1,
        m: 2,
        // overflow: "hidden",
        overflowY: "auto"
    },
    td:  function (width) {
        
        return {
            p: 1,
            w: width,
        }
    },
    th: function (width) {
        
        return {
            p: 1,
            w: width,
        }
    },
    text: {
        fontSize: ["12px","12px","16px","18px"],
        textAlign: "center"
      },
    thText: {
        fontSize: ["12px","14px","14px"],
        textAlign: "center"
      },
    tdText: {
        fontSize: ["10px","12px","14px"],
        textAlign: "center"
      },

};