using System;
using ECommerceAPI.Application.ViewModels.Products;
using FluentValidation;

namespace ECommerceAPI.Application.Validators.Products
{
	public class CreateProductValidator : AbstractValidator<VM_Create_Product>
	{
        public CreateProductValidator()
        {
            RuleFor(product => product.Name).NotEmpty().WithMessage("Please fill the name");
            RuleFor(product => product.Name).NotNull().WithMessage("Please fill the name");
            RuleFor(product => product.Name).MinimumLength(5).WithMessage("Name has to be min 5 char");
            RuleFor(product => product.Name).MaximumLength(150).WithMessage("Name has to be max 150 char");

            RuleFor(product => product.Stock).NotEmpty().WithMessage("Please fill the Stock");
            RuleFor(product => product.Stock).NotNull().WithMessage("Please fill the Stock");
            RuleFor(product => product.Stock).Must(stock => stock >= 0).WithMessage("Stock can not be negative");

            RuleFor(product => product.Price).NotEmpty().WithMessage("Please fill the Price");
            RuleFor(product => product.Price).NotNull().WithMessage("Please fill the Price");
            RuleFor(product => product.Price).Must(stock => stock >= 0).WithMessage("Price can not be negative");
        }
	}
}

