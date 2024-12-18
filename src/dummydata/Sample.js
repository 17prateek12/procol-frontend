const DummyItems = [
  // Items with dynamic fields
  {
    _id: "64a8d1fda5f4f32d50ed9c01",
    itemName: "Projector",
    quantity: 2,
    dynamicFields: { brand: "Epson", model: "X100" },
    event: "64a8d1fda5f4f32d50ed9e01",
  },
  {
    _id: "64a8d1fda5f4f32d50ed9c02",
    itemName: "Laptop",
    quantity: 5,
    dynamicFields: { brand: "Dell", specs: "i7, 16GB RAM" },
    event: "64a8d1fda5f4f32d50ed9e02",
  },
  {
    _id: "64a8d1fda5f4f32d50ed9c03",
    itemName: "Chairs",
    quantity: 50,
    dynamicFields: { type: "foldable", color: "blue" },
    event: "64a8d1fda5f4f32d50ed9e03",
  },
  {
    _id: "64a8d1fda5f4f32d50ed9c04",
    itemName: "Microphone",
    quantity: 10,
    dynamicFields: { type: "wireless", brand: "Sony" },
    event: "64a8d1fda5f4f32d50ed9e04",
  },

  // Items without dynamic fields
  {
    _id: "64a8d1fda5f4f32d50ed9c05",
    itemName: "Whiteboard",
    quantity: 2,
    event: "64a8d1fda5f4f32d50ed9e05",
  },
  {
    _id: "64a8d1fda5f4f32d50ed9c06",
    itemName: "Speakers",
    quantity: 4,
    event: "64a8d1fda5f4f32d50ed9e01",
  },
  {
    _id: "64a8d1fda5f4f32d50ed9c07",
    itemName: "Stage Lighting",
    quantity: 6,
    event: "64a8d1fda5f4f32d50ed9e02",
  },
  {
    _id: "64a8d1fda5f4f32d50ed9c08",
    itemName: "Catering Supplies",
    quantity: 100,
    event: "64a8d1fda5f4f32d50ed9e04",
  },
];

const DummyData = [
  {
    _id: "64a8d1fda5f4f32d50ed9e01",
    eventName: "Annual Company Meeting",
    eventDate: "2024-12-20",
    startTime: "2024-12-20T09:00:00Z",
    endTime: "2024-12-20T12:00:00Z",
    description: "An overview of the company's achievements and goals for the next year.",
    createdBy: "675d88e3d672bfeb7e9512ce",
    item: ["64a8d1fda5f4f32d50ed9c01", "64a8d1fda5f4f32d50ed9c06"],
  },
  {
    _id: "64a8d1fda5f4f32d50ed9e02",
    eventName: "Winter Fest",
    eventDate: "2024-12-25",
    startTime: "2024-12-25T17:00:00Z",
    endTime: "2024-12-25T22:00:00Z",
    description: "A fun-filled evening with food, music, and celebrations.",
    createdBy: "123e4567e89b12d3a456426614174001",
    item: ["64a8d1fda5f4f32d50ed9c02", "64a8d1fda5f4f32d50ed9c07"],
  },
  {
    _id: "64a8d1fda5f4f32d50ed9e03",
    eventName: "Tech Workshop",
    eventDate: "2025-01-10",
    startTime: "2025-01-10T10:00:00Z",
    endTime: "2025-01-10T16:00:00Z",
    description: "Hands-on training for the latest tech tools and practices.",
    createdBy: "675d88e3d672bfeb7e9512ce",
    item: ["64a8d1fda5f4f32d50ed9c03"],
  },
  {
    _id: "64a8d1fda5f4f32d50ed9e04",
    eventName: "Charity Run",
    eventDate: "2025-02-15",
    startTime: "2025-02-15T06:00:00Z",
    endTime: "2025-02-15T09:00:00Z",
    description: "A marathon to raise funds for a local charity.",
    createdBy: "784f8910c128bcde5f4234567890abcd",
    item: ["64a8d1fda5f4f32d50ed9c04", "64a8d1fda5f4f32d50ed9c08"],
  },

  // Event without dynamic field items
  {
    _id: "64a8d1fda5f4f32d50ed9e05",
    eventName: "Marketing Strategy Brainstorm",
    eventDate: "2025-01-18",
    startTime: "2025-01-18T14:00:00Z",
    endTime: "2025-01-18T17:00:00Z",
    description: "Collaborative session to refine marketing strategies for the upcoming quarter.",
    createdBy: "675d88e3d672bfeb7e9512ce",
    item: ["64a8d1fda5f4f32d50ed9c05"],
  },
  {
    _id: "64a8d1fda5f4f32d50ed9e06",
    eventName: "Community Cleanup Drive",
    eventDate: "2023-11-10",
    startTime: "2023-11-10T07:00:00Z",
    endTime: "2023-11-10T12:00:00Z",
    description: "A volunteer event to clean and beautify the local park.",
    createdBy: "90ab4567c89d12d3e1234567890fghij",
    item: [],
  },
];

  
  export {DummyData, DummyItems};