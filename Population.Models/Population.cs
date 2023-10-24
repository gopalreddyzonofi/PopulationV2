namespace Population.Models;

using System.ComponentModel.DataAnnotations;
using System.Linq;

public class Population
{
    [Key]
    public int ID { get; set; }

    [Required(ErrorMessage = "Country is required.")]
    [StringLength(100, ErrorMessage = "Country name cannot exceed 100 characters.")]
    public string? Country { get; set; }

    [Range(1900, 2100, ErrorMessage = "Year should be between 1900 and 2100.")]
    public int Year { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "TotalMale should be a positive number.")]
    public double TotalMale { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "TotalFemale should be a positive number.")]
    public double TotalFemale { get; set; }

    
}






