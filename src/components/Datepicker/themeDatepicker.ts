export const theme = {
  root: {
    base: "relative flex justify-center",
  },
  popup: {
    root: {
      base: "absolute top-10 z-50 block py-2 mb-4",
      inline: "relative top-0 z-auto",
      inner: "inline-block rounded-lg bg-white px-6 py-4 shadow-lg",
    },
    header: {
      base: "",
      title:
        "px-2 py-3 text-center font-semibold block text-base font-normal text-text",
      selectors: {
        base: "mb-2 flex justify-between",
        button: {
          base: "rounded-lg bg-white px-5 py-2.5 text-sm text-text font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200",
          prev: "",
          next: "",
          view: "",
        },
      },
    },
    view: {
      base: "w-full",
    },
    footer: {
      base: "mt-2 flex space-x-2",
      button: {
        base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
        today: "bg-cyan-700 text-white hover:bg-cyan-800 ",
        clear:
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",
      },
    },
  },
  views: {
    days: {
      header: {
        base: "mb-1 grid grid-cols-7",
        title:
          "h-6 text-center text-sm font-semibold leading-6 block text-base font-normal text-text ",
      },
      items: {
        base: "grid w-64 grid-cols-7",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm leading-9 text-text hover:bg-gray-100 ",
          selected:
            " bg-primary  text-white focus:bg-primary active:bg-primary hover:bg-primary rounded-3xl",
          disabled: "text-gray-500",
        },
      },
    },
    months: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm text-text font-semibold leading-9 text-gray-900 hover:bg-gray-100 ",
          selected: "bg-cyan-700 text-white hover:bg-cyan-600",
          disabled: "text-gray-500",
        },
      },
    },
    years: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100",
          selected: "bg-cyan-700 text-white hover:bg-cyan-600",
          disabled: "text-gray-500",
        },
      },
    },
    decades: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100",
          selected: "bg-cyan-700 text-white hover:bg-cyan-600",
          disabled: "text-gray-500",
        },
      },
    },
  },
};
