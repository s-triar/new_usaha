using Microsoft.AspNetCore.Mvc;

namespace new_usaha.WebUI.Controllers;
public class MyGoodsController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
