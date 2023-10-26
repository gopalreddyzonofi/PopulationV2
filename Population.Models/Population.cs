namespace Population.Models;

using System.ComponentModel.DataAnnotations;
using System.Linq;

public class Population
{
    public int ID { get; set; }


    public string? Country { get; set; }

    public int Year { get; set; }

   
    public string? TotalMale { get; set; }

    
    public string? TotalFemale { get; set; }

    
}






