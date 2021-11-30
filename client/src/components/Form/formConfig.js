const formConfig = {
  fields: {
    firstName: {
      display: false,
      required: true,
    },
    lastName: {
      display: true,
      required: true,
    },
    selectedDate: {
      display: true,
      required: false,
    },
    street: {
      display: true,
      required: true,
    },
    city: {
      display: true,
      required: true,
    },
    USstate: {
      display: false,
      required: true,
    },
    zip: {
      display: false,
      required: true,
    },
    motherName: {
      display: true,
      required: true,
    },
    phone: {
      display: true,
      required: false,
    },
    sex: {
      display: true,
      required: false,
    },
  },
};

export default formConfig;
