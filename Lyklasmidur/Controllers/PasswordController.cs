using Lyklasmidur.Core.Models;
using Lyklasmidur.Core.Services;
using Lyklasmidur.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Lyklasmidur.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PasswordController : ControllerBase
    {
        private readonly IOrdService _service;
        public PasswordController(IOrdService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<string> Get()
        {
            Random rnd = new Random();
            string pw = "";
            string noun = "";
            string adverb = "";

            try
            {
                noun = CapitalizeString((await _service.GetSingleAsync("n")).Word);

                pw = $"{noun}.{rnd.Next(1000, 9999)}";

                if (pw.Length < 12)
                {
                    adverb = CapitalizeString((await _service.GetSingleAsync("a")).Word);
                    pw = $"{adverb}.{pw}";
                }
                
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in PasswordController!", ex);
            }

            return pw;
        }

        private string CapitalizeString(string word)
        {
            return string.Concat(word[0].ToString().ToUpper(), word.AsSpan(1));
        }
    }
}
