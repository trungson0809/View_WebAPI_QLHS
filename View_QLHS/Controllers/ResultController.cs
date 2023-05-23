using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using View_QLHS.Models;

namespace View_QLHS.Controllers
{
    public class SubjectController : Controller
    {
        private readonly ILogger<SubjectController> _logger;

        public SubjectController(ILogger<SubjectController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}