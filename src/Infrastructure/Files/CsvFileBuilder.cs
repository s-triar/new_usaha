using CsvHelper;
using new_usaha.Application.Common.Interfaces;
//using new_usaha.Application.TodoLists.Queries.ExportTodos;
using new_usaha.Infrastructure.Files.Maps;
using System.Globalization;

namespace new_usaha.Infrastructure.Files
{
    public class CsvFileBuilder : ICsvFileBuilder
    {
        //public byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records)
        //{
        //    using var memoryStream = new MemoryStream();
        //    using (var streamWriter = new StreamWriter(memoryStream))
        //    {
        //        using var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture);

        //        csvWriter.Configuration.RegisterClassMap<TodoItemRecordMap>();
        //        csvWriter.WriteRecords(records);
        //    }

        //    return memoryStream.ToArray();
        //}
    }
}