export default {
  table: {
    display: "block",
    colorScheme: "blackAlpha",
    variant: "striped",
    wordBreak: "break-word",
    maxH: ["30vh", "40vh", "40vh"],
    w: "100%",
    p: 1,
    m: 0,
    // overflow: "hidden",
    overflowY: "auto",
  },
  td: function (width, pointer) {
    return {
      p: 1,
      width: width,
      cursor: pointer ? "pointer" : "auto",
    };
  },
  th: function (width) {
    return {
      p: 0,
      width: width,
    };
  },
  tr: function (pointer) {
    return {
      cursor: pointer ? "pointer" : "auto",
    };
  },
  text: {
    fontSize: ["12px", "12px", "16px", "18px"],
    textAlign: "center",
  },
  thText: {
    fontSize: ["12px", "14px", "14px"],
    textAlign: "center",
  },
  tdText: {
    fontSize: ["10px", "12px", "14px"],
    textAlign: "center",
  },
};
