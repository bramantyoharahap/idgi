using IDGI.WebApi.Models;
using IDGI.WebApi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace IDGI.WebApi.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ProductController : ApiController
    {
        private IRepository<Product> _repoProduct;
        public ProductController()
        {
            _repoProduct = new Repository<Product>();
        }
        public IHttpActionResult GetAll()
        {
            return Json(_repoProduct.GetAll());
        }
        public IHttpActionResult Add([Bind(Exclude = "ID")]Product product)
        {
            _repoProduct.Add(product);
            return Json(product);
        }
        public IHttpActionResult Update([Bind(Include = "Code,Name")]Product product)
        {
            _repoProduct.Update(product);
            return Json(product);
        }
        public IHttpActionResult Remove(string Id)
        {
            _repoProduct.Remove(Id);
            return Json(new { IsSuccess = true });
        }
    }
}
