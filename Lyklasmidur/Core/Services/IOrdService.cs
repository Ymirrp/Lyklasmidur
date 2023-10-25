using Lyklasmidur.Core.Models;

namespace Lyklasmidur.Core.Services
{
    public interface IOrdService
    {
        Task<List<WordModel>> GetAsync();

        Task<List<WordModel>> GetAsync(string type);

        Task<WordModel> GetSingleAsync();

        Task<WordModel> GetSingleAsync(string type);
    }
}
