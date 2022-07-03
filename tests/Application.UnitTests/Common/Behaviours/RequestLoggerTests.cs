﻿using Microsoft.Extensions.Logging;
using Moq;
using new_usaha.Application.Common.Behaviours;
using new_usaha.Application.Common.Interfaces;
//using new_usaha.Application.TodoItems.Commands.CreateTodoItem;
using NUnit.Framework;

namespace new_usaha.Application.UnitTests.Common.Behaviours
{
    public class RequestLoggerTests
    {
        //private Mock<ILogger<CreateTodoItemCommand>> _logger ;
        private Mock<ICurrentUserService> _currentUserService ;
        private Mock<IIdentityService> _identityService ;
        [SetUp]
        public void Setup()
        {
            //_logger = new Mock<ILogger<CreateTodoItemCommand>>();
            _currentUserService = new Mock<ICurrentUserService>();
            _identityService = new Mock<IIdentityService>();
        }

        [Test]
        public async Task ShouldCallGetUserNameAsyncOnceIfAuthenticated()
        {
            _currentUserService.Setup(x => x.UserId).Returns(Guid.NewGuid().ToString());

            //var requestLogger = new LoggingBehaviour<CreateTodoItemCommand>(_logger.Object, _currentUserService.Object, _identityService.Object);

            //await requestLogger.Process(new CreateTodoItemCommand { ListId = 1, Title = "title" }, new CancellationToken());

            _identityService.Verify(i => i.GetUserNameAsync(It.IsAny<string>()), Times.Once);
        }

        [Test]
        public async Task ShouldNotCallGetUserNameAsyncOnceIfUnauthenticated()
        {
            //var requestLogger = new LoggingBehaviour<CreateTodoItemCommand>(_logger.Object, _currentUserService.Object, _identityService.Object);

            //await requestLogger.Process(new CreateTodoItemCommand { ListId = 1, Title = "title" }, new CancellationToken());

            _identityService.Verify(i => i.GetUserNameAsync(It.IsAny<string>()), Times.Never);
        }
    }
}