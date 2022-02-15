Vue.createApp({
  data() {
    return {
      message: "Hello Vue!",
      urlFormat: "",
      urlInstance: "",
      hash: [],
      error: "",
    };
  },

  methods: {
    addQuotationMarks: function (value) {
      return parseInt(value) ? value : `'${value}'`;
    },

    parseUrl: function () {
      this.error = "";

      if (!this.urlFormat || !this.urlInstance) {
        return (this.error = "Nothing to parse here. So don't waste my time.");
      }

      try {
        const splittedUrl = this.urlFormat.split("/");
        const splittedUrlInstance = this.urlInstance.split("/");

        let indexes = [];

        splittedUrl.map((el, i) => {
          if (el.includes(":")) {
            const newEl = el.substring(1);
            indexes.push({
              label: newEl,
              id: i,
            });
          }
        });

        indexes.map((param) => {
          splittedUrlInstance.map((el, i) => {
            if (param.id == i) {
              if (el.includes("?")) {
                const splitted = el.split("?");
                param.value = splitted[0];

                const queryParams = splitted[1].split("&");

                queryParams.map((queryPm) => {
                  const splittedQueryParam = queryPm.split("=");
                  indexes.push({
                    label: splittedQueryParam[0],
                    value: splittedQueryParam[1],
                  });
                });
              } else {
                param.value = el;
              }
            }
          });
        });

        this.hash = indexes;
      } catch (err) {
        this.error = "Not a valid URL, hon. Try again.";
      }
    },
  },
}).mount("#app");
