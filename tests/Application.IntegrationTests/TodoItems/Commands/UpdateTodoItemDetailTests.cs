using FluentAssertions;
using new_usaha.Application.Common.Exceptions;
//using new_usaha.Application.TodoItems.Commands.CreateTodoItem;
//using new_usaha.Application.TodoItems.Commands.UpdateTodoItem;
//using new_usaha.Application.TodoItems.Commands.UpdateTodoItemDetail;
//using new_usaha.Application.TodoLists.Commands.CreateTodoList;
using new_usaha.Domain.Entities;
using new_usaha.Domain.Enums;
using NUnit.Framework;
//using static Testing;

namespace new_usaha.Application.IntegrationTests.TodoItems.Commands
{
    //public class UpdateTodoItemDetailTests : BaseTestFixture
    //{
        //[Test]
        //public async Task ShouldRequireValidTodoItemId()
        //{
        //    //var command = new UpdateTodoItemCommand { Id = 99, Title = "New Title" };
        //    //await FluentActions.Invoking(() => Testing.SendAsync(command)).Should().ThrowAsync<NotFoundException>();
        //}

        //[Test]
        //public async Task ShouldUpdateTodoItem()
        //{
        //    //var userId = await Testing.RunAsDefaultUserAsync();

        //    //var listId = await Testing.SendAsync(new CreateTodoListCommand
        //    //{
        //    //    Title = "New List"
        //    //});

        //    //var itemId = await Testing.SendAsync(new CreateTodoItemCommand
        //    //{
        //    //    ListId = listId,
        //    //    Title = "New Item"
        //    //});

        //    //var command = new UpdateTodoItemDetailCommand
        //    //{
        //    //    Id = itemId,
        //    //    ListId = listId,
        //    //    Note = "This is the note.",
        //    //    Priority = PriorityLevel.High
        //    //};

        //    //await Testing.SendAsync(command);

        //    //var item = await Testing.FindAsync<TodoItem>(itemId);

        //    //item.Should().NotBeNull();
        //    //item!.ListId.Should().Be(command.ListId);
        //    //item.Note.Should().Be(command.Note);
        //    //item.Priority.Should().Be(command.Priority);
        //    //item.LastModifiedBy.Should().NotBeNull();
        //    //item.LastModifiedBy.Should().Be(userId);
        //    //item.LastModified.Should().NotBeNull();
        //    //item.LastModified.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMilliseconds(10000));
        //}
    //}
}