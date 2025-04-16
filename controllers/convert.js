const fs = require("fs");
const xsd2jsonSchema = require("xsd2jsonschema").Xsd2JsonSchema;

const convertToJson = async (req, res) => {
  const file = req.files;

  if (!file) res.status(400).json({ msg: "Invalid file!" });

  const xs2js = new xsd2jsonSchema();
  const filePath = file["xsd"].tempFilePath;

  fs.readFile(filePath, (err, data) => {
    if (err) res.send(err);

    const XML_SCHEMA = data.toString();
    try {
      const convertedSchemas = xs2js.processAllSchemas({
        schemas: { "test.xsd": XML_SCHEMA },
      });
      const jsonSchema = convertedSchemas["test.xsd"].getJsonSchema();
      const result = JSON.stringify(jsonSchema);
      res.status(200).json({ msg: "success!!", result });
    } catch (error) {
      res.status(400).json({ msg: "Something went wrong please try again!" });
    }
  });
};

module.exports = convertToJson;
