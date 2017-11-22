using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VNMuasam.WEB.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult Detail()
        {
            if (Global.IsMobileMode())
            {
                return View("Detail.Mobile");
            }
            return View("Detail");
        }
    }
}