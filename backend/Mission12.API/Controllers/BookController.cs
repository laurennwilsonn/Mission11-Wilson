using Microsoft.AspNetCore.Mvc;
using Mission12.API.Data;
using System.Linq;

namespace Mission12.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : Controller
    {
        private BookDbContext _bookContext;
        
        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet("GetBookList")]

        public IActionResult Get(int pageSize = 5, int pageNum = 1, string sortBy = "")
        {

            var query = _bookContext.Books.AsQueryable();

            if (!string.IsNullOrEmpty(sortBy) && sortBy.ToLower() == "title")
            {
                query = query.OrderBy(b => b.Title);
            }

            var something = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();


            var totalNumBooks = _bookContext.Books.Count();

            return Ok(new 
            {
                Books = something,
                totalNumBooks = totalNumBooks
            });
        }
    }
}