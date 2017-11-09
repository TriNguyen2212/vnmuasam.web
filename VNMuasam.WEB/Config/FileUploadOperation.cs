using Swashbuckle.Swagger;
using System.Collections.Generic;
using System.Web.Http.Description;

namespace VNMuasam.WEB
{
    public class FileUploadOperation : IOperationFilter
    {
        public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
        {
            if (operation.operationId.ToLower() == "massproducts_updatefromexcel"
                || operation.operationId.ToLower().Contains("orderproductcycleweeks_updatefromexcel")
                || operation.operationId.ToLower().Contains("uploadfiles_uploadfile"))
            {
                operation.parameters = new List<Parameter>();
                operation.parameters.Add(new Parameter
                {
                    name = "uploadedFile",
                    @in = "formData",
                    description = "Upload File",
                    required = true,
                    type = "file"
                });
                operation.consumes.Add("multipart/form-data");
            }
        }
    }
}