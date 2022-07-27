const Customer = require("./model/Customer");

const customer = [
  new Customer({
    email: "peter.parker@platr.ng",
    firstName: "Peter",
    lastName: "Parker",
    phone: "+234000000000",
  }),
  new Customer({
    email: "john.peter@platr.ng",
    firstName: "Jon",
    lastName: "Peter",
    avatar: "",
    phone: "+23491000000000",
  }),
  new Customer({
    email: "clementpaul@platr.ng",
    firstName: "Paul",
    lastName: "Clement",
    phone: "+23491000000000",
  }),
];

exports.seedCustomer = async () => {
  try {
    const customerCollection = await Customer.find();
    if (customerCollection.length > 0) {
      return;
    }
    await Customer.collection.drop();
    customer.forEach((customer) => {
      Customer.create(customer);
    });
    console.log("Customer collection has been added to db.");
  } catch (error) {
    console.log(error);
  }
};
