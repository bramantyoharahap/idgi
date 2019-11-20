using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using IDGI.WebApi.Models;
using IDGI.WebApi.Repository;

namespace IDGI.WebApi.Controllers
{
    [EnableCors("*", "*", "*")]
    public class SupplierController : ApiController
    {
        private IRepository<Supplier> _repoSupplier;
        public SupplierController()
        {
            _repoSupplier = new Repository<Supplier>();
        }
        public IHttpActionResult GetAll()
        {
           return Json(_repoSupplier.GetAll());
        }

        [System.Web.Mvc.HttpPost]
        [System.Web.Mvc.Route("")]
        public IHttpActionResult Add([Bind(Exclude = "ID")] Supplier supplier)
        {
            _repoSupplier.Add(supplier);
            return Json(supplier);
        }

        [System.Web.Http.HttpPost]
        public IHttpActionResult Update([Bind(Include = "Code,Name")]Supplier supplier)
        {
            _repoSupplier.Update(supplier);
            return Json(supplier);
        }

        [System.Web.Http.HttpPost]
        public IHttpActionResult Remove(string Id)
        {
            _repoSupplier.Remove(Id);
            return Json(new { IsSuccess = true });
        }
    }
}
