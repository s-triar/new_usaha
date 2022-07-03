using FluentAssertions;
using new_usaha.Application.Common.Exceptions;
using new_usaha.Application.Common.Security;
//using new_usaha.Application.TodoLists.Commands.CreateTodoList;
//using new_usaha.Application.TodoLists.Commands.PurgeTodoLists;
using new_usaha.Domain.Entities;
using NUnit.Framework;
//using static Testing;

namespace new_usaha.Application.IntegrationTests.TodoLists.Commands
{
    //public class PurgeTodoListsTests : BaseTestFixture
    //{
        //[Test]
        //public async Task ShouldDenyAnonymousUser()
        //{
        //    //var command = new PurgeTodoListsCommand();

        //    //command.GetType().Should().BeDecoratedWith<AuthorizeAttribute>();

        //    //var action = () => Testing.SendAsync(command);

        //    //await action.Should().ThrowAsync<UnauthorizedAccessException>();
        //}

        //[Test]
        //public async Task ShouldDenyNonAdministrator()
        //{
        //    //await Testing.RunAsDefaultUserAsync();

        //    //var command = new PurgeTodoListsCommand();

        //    //var action = () => Testing.SendAsync(command);

        //    //await action.Should().ThrowAsync<ForbiddenAccessException>();
        //}

        //[Test]
        //public async Task ShouldAllowAdministrator()
        //{
        //    //await Testing.RunAsAdministratorAsync();

        //    //var command = new PurgeTodoListsCommand();

        //    //var action = () => Testing.SendAsync(command);

        //    //await action.Should().NotThrowAsync<ForbiddenAccessException>();
        //}

        //[Test]
        //public async Task ShouldDeleteAllLists()
        //{
        //    await Testing.RunAsAdministratorAsync();

        //    //await Testing.SendAsync(new CreateTodoListCommand
        //    //{
        //    //    Title = "New List #1"
        //    //});

        //    //await Testing.SendAsync(new CreateTodoListCommand
        //    //{
        //    //    Title = "New List #2"
        //    //});

        //    //await Testing.SendAsync(new CreateTodoListCommand
        //    //{
        //    //    Title = "New List #3"
        //    //});

        //    //await Testing.SendAsync(new PurgeTodoListsCommand());

        //    //var count = await Testing.CountAsync<TodoList>();

        //    //count.Should().Be(0);
        //}
    //}
}