using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SimpleShoppingList.Models;

namespace SimpleShoppingList.Controllers
{
    public class ShoppingListController : ApiController
    {
        private List<ShoppingList> shoppingLists = new List<ShoppingList>
        {
            new ShoppingList() { Id = 0, Name = "Groceries", Items =
            {
                new Item { Name = "Milk" },
                new Item { Name = "Chocolate" },
                new Item { Name = "Butter" }
            }},
            new ShoppingList() { Id = 1, Name = "Hardware" }
        };

        // GET: api/ShoppingList/5
        public IHttpActionResult Get(int id)
        {
            var result = shoppingLists.FirstOrDefault(s => s.Id == id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // POST: api/ShoppingList
        public void Post([FromBody]string value)
        {
        }
    }
}
