import Service from "../models/service-model.js"; // Correct import statement

// GET - Fetch all services
const services = async (req, res) => {
  try {
    const response = await Service.find();

    // If no services are found
    if (!response || response.length === 0) {
      return res.status(404).json({ msg: "No services found" });
    }

    // Success, return services
    res.status(200).json({ msg: "Services found", data: response });
  } catch (error) {
    console.error("Error from the server:", error);
    res.status(500).json({ msg: "Error from the Backend", error: error.message });
  }
};

// POST - Create a new service
const postService = async (req, res) => {
  const { service, description, price, provider } = req.body;

  // Validation: Ensure all required fields are provided
  if (!service || !description || !price || !provider) {
    return res.status(400).json({ msg: "Please provide all required fields: service, description, price, provider" });
  }

  try {
    const newService = new Service({
      service,
      description,
      price,
      provider,
    });

    // Save the new service to the database
    await newService.save();

    res.status(201).json({ msg: "Service created successfully", data: newService });
  } catch (error) {
    console.error("Error while saving service:", error);
    res.status(500).json({ msg: "Error from the Backend", error: error.message });
  }
};

export { services, postService };
