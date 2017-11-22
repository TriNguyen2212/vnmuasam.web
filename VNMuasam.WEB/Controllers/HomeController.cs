using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VNMuasam.Business.Service;

namespace VNMuasam.WEB.Controllers
{
    public class HomeController : Controller
    {
        private readonly IUserService _UserService;

        public HomeController(IUserService UserService)
        {
            _UserService = UserService;
        } 

        public ActionResult Index()
        {
            if (Global.IsMobileMode())
            {
                return View("Index.Mobile");
            }
            return View("Index");
        }
        public ActionResult Index_()
        {
            ViewBag.LstUser = _UserService.List();
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}