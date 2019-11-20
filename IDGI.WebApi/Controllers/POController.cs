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
    public class POController : ApiController
    {
        private IRepository<PurchaseOrder> _repoPO;
        public POController()
        {
            _repoPO = new Repository<PurchaseOrder>();
        }
        public IHttpActionResult GetAll()
        {
            return Json(_repoPO.GetAll());
        }
        public IHttpActionResult Add([Bind(Exclude = "ID")]PurchaseOrder po)
        {
            _repoPO.Add(po);
            return Json(po);
        }
        public IHttpActionResult Update([Bind(Include = "Code,Name")]PurchaseOrder po)
        {
            _repoPO.Update(po);
            return Json(po);
        }
        public IHttpActionResult Remove(string Id)
        {
            _repoPO.Remove(Id);
            return Json(new { IsSuccess = true });
        }
    }
}
