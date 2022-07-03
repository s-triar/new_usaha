using FluentAssertions;
using new_usaha.Application.Common.Exceptions;
//using new_usaha.Application.TodoItems.Commands.CreateTodoItem;
//using new_usaha.Application.TodoLists.Commands.CreateTodoList;
using new_usaha.Domain.Entities;
using NUnit.Framework;
//using static Testing;

namespace new_usaha.Application.IntegrationTests.TodoItems.Commands
{
    //public class CreateTodoItemTests : BaseTestFixture
    //{
        //[Test]
        //public async Task ShouldRequireMinimumFields()
        //{
        //    //var command = new CreateTodoItemCommand();

        //    //await FluentActions.Invoking(() =>
        //    //    Testing.SendAsync(command)).Should().ThrowAsync<ValidationException>();
        //}

        //[Test]
        //public async Task ShouldCreateTodoItem()
        //{
        //    var userId = await Testing.RunAsDefaultUserAsync();

        //    //var listId = await Testing.SendAsync(new CreateTodoListCommand
        //    //{
        //    //    Title = "New List"
        //    //});

        //    //var command = new CreateTodoItemCommand
        //    //{
        //    //    ListId = listId,
        //    //    Title = "Tasks"
        //    //};

        //    //var itemId = await Testing.SendAsync(command);

        //    //var item = await Testing.FindAsync<TodoItem>(itemId);

        //    //item.Should().NotBeNull();
        //    //item!.ListId.Should().Be(command.ListId);
        //    //item.Title.Should().Be(command.Title);
        //    //item.CreatedBy.Should().Be(userId);
        //    //item.Created.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMilliseconds(10000));
        //    //item.LastModifiedBy.Should().Be(userId);
        //    //item.LastModified.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMilliseconds(10000));
        //}
    //}
}