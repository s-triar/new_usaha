using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace new_usaha.Application.Common.Models;
public class ResultWithMessage: Result
{
    public string Message { get; set; }
    public ResultWithMessage(bool succeeded, IEnumerable<string> errors, string message) : base(succeeded, errors)
    {
        Message = message;
    }
}
