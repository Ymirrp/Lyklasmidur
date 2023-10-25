using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Lyklasmidur.Core.Models
{
    public class WordModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("type")]
        public string Type { get; set; } = null!;
        [BsonElement("word")]
        public string Word { get; set; } = null!;
    }
}
