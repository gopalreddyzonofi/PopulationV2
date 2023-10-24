using Microsoft.AspNetCore.Mvc;
using Population.Api.Services;
using Population.Models;

namespace Population.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class PopulationController : ControllerBase
{
    private readonly IPopulationService _populationService;

    private readonly ILogger<PopulationController> _logger;


    public PopulationController(ILogger<PopulationController> logger, IPopulationService populationService)
    {
        _logger = logger;
        _populationService = populationService;
    }
    [HttpGet]
    public ActionResult<PaginatedResponse<Population.Models.Population>> Get(string searchTerm = null, string sortBy = null, string sortDirection = null, int pageNumber = 1, int pageSize = 10)
    {
        var populations = _populationService.GetAll(searchTerm, sortBy, sortDirection, pageNumber, pageSize);

        
        return Ok(populations);
    }
    [HttpPut("{id}")]
    public IActionResult Update([FromBody] Population.Models.Population updatedPopulation, int id)
    {
        if (updatedPopulation == null || id <= 0)
            return BadRequest();

        if (_populationService.Update(updatedPopulation))
            return Ok();
        else
            return NotFound();
    }

}

