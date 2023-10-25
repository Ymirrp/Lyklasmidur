using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Bson;
using Lyklasmidur.Core.Services;
using Lyklasmidur.Core.Models;
using Microsoft.Extensions.Options;
using System;

namespace Lyklasmidur.Infrastructure.Services
{
    public class OrdService : IOrdService
    {
        private readonly IMongoCollection<WordModel> _collection;

        public OrdService(IOptions<OrdDBSettings> options)
        {
            var _client = new MongoClient(options.Value.ConnectionURI);
            var _database = _client.GetDatabase(options.Value.DatabaseName);

            _collection = _database.GetCollection<WordModel>(options.Value.CollectionName);
        }

        public async Task<List<WordModel>> GetAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<List<WordModel>> GetAsync(string type)
        {
            return await _collection.Find(c => c.Type == type).ToListAsync(); 
        }

        public async Task<WordModel> GetSingleAsync()
        {
            return await _collection.Find(_ => true).FirstOrDefaultAsync();
        }

        public async Task<WordModel> GetSingleAsync(string type)
        {
            //Random random = new Random();

            var res = await _collection.AsQueryable().Where(w => w.Type == type).Sample(1).FirstOrDefaultAsync();
            //var res2 = await _collection.Find(c => c.Type == type).Skip(random.Next(1000)).FirstOrDefaultAsync();

            return res;
        }
    }
}
