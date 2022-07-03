using FluentAssertions;
using new_usaha.Application.Common.Exceptions;
//using new_usaha.Application.TodoLists.Commands.CreateTodoList;
//using new_usaha.Application.TodoLists.Commands.UpdateTodoList;
using new_usaha.Domain.Entities;
using NUnit.Framework;
//using static Testing;

namespace new_usaha.Application.IntegrationTests.TodoLists.Commands
{
    //public class UpdateTodoListTests : BaseTestFixture
    //{
        //[Test]
        //public async Task ShouldRequireValidTodoListId()
        //{
        //    //var command = new UpdateTodoListCommand { Id = 99, Title = "New Title" };
        //    //await FluentActions.Invoking(() => Testing.SendAsync(command)).Should().ThrowAsync<NotFoundException>();
        //}

        //[Test]
        //public async Task ShouldRequireUniqueTitle()
        //{
        //    //var listId = await Testing.SendAsync(new CreateTodoListCommand
        //    //{
        //    //    Title = "New List"
        //    //});

        //    //await Testing.SendAsync(new CreateTodoListCommand
        //    //{
        //    //    Title = "Other List"
        //    //});

        //    //var command = new UpdateTodoListCommand
        //    //{
        //    //    Id = listId,
        //    //    Title = "Other List"
        //    //};

        //    //(await FluentActions.Invoking(() =>
        //    //    Testing.SendAsync(command))
        //    //        .Should().ThrowAsync<ValidationException>().Where(ex => ex.Errors.ContainsKey("Title")))
        //    //        .And.Errors["Title"].Should().Contain("The specified title already exists.");
        //}

        //[Test]
        //public async Task ShouldUpdateTodoList()
        //{
        //    //var userId = await Testing.RunAsDefaultUserAsync();

        //    //var listId = await Testing.SendAsync(new CreateTodoListCommand
        //    //{
        //    //    Title = "New List"
        //    //});

        //    //var command = new UpdateTodoListCommand
        //    //{
        //    //    Id = listId,
        //    //    Title = "Updated List Title"
        //    //};

        //    //await Testing.SendAsync(command);

        //    //var list = await Testing.FindAsync<TodoList>(listId);

        //    //list.Should().NotBeNull();
        //    //list!.Title.Should().Be(command.Title);
        //    //list.LastModifiedBy.Should().NotBeNull();
        //    //list.LastModifiedBy.Should().Be(userId);
        //    //list.LastModified.Should().NotBeNull();
        //    //list.LastModified.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMilliseconds(10000));
        //}
    //}
}