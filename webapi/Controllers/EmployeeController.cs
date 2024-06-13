using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Controllers;

[Route("Api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    

    private readonly ILogger<EmployeeController> _logger;
    private readonly ApplicationDbContext _context;

    public EmployeeController(ILogger<EmployeeController> logger,ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
    {
        if(_context.Employees==null)
        {
            return NotFound();
        }
        return await _context.Employees.ToListAsync();
    }
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Employee>> GetEmployee(int id)
    {
        if(_context.Employees==null)
        {
            return NotFound();
        }
        var employee= await _context.Employees.FindAsync(id);
        if(employee==null)
        {
            return NotFound();
        }
        else
        {
            return employee;
        }
    }
    [HttpPost]
    public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
    {
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEmployee),new {id=employee.Id},employee);
    }
    [HttpPut("{id:int}")]
    public async Task<ActionResult> PutEmployee(int id,Employee employee)
    {
        if(id!=employee.Id)
        {
            return BadRequest();
        }
        _context.Entry(employee).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch(DbUpdateConcurrencyException)
        {
            throw;
        }
        return Ok();
    }
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteEmployee(int id)
    {
        if(_context.Employees==null)
        {
            return NotFound();
        }
        var employee= await _context.Employees.FindAsync(id);
        if(employee==null)
        {
            return NotFound();
        }
        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();

        return Ok();
    }
}
