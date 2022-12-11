using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using new_usaha.Application.Common.Constants;
using new_usaha.Application.Common.Interfaces;
using new_usaha.Domain.Entities;

namespace new_usaha.Application.CQRS.MyGoodses.Commands;

public class AlterGoodsCommand
{
    private readonly IApplicationDbContext _context;
    private readonly IDateTime _tanggal;

    public AlterGoodsCommand(IApplicationDbContext context, IDateTime tanggal)
    {
        _context = context;
        _tanggal = tanggal;
    }

    public virtual async Task AddGoodsPhoto(Guid goodsId, IFormFile? PhotoFile, string? Photo, CancellationToken cancellationToken)
    {
        try
        {
            if (PhotoFile != null)
            {
                var folderName = Path.Combine(ResourcesPath.RESOURCES, ResourcesPath.GOODS_FOLDER);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var file = PhotoFile;
                var temp = PhotoFile.ContentType.Split("/");
                var fileName = Guid.NewGuid().ToString().Substring(10, 14) + new DateTime().Ticks.ToString() + "." + temp[temp.Length - 1];
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                var entity = new GoodsPhoto
                {
                    GoodsId = goodsId,
                    Url = dbPath,
                };
                _context.GoodsPhotos.Add(entity);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
        catch (Exception ex)
        {
            
        }
    }

    public async Task AlterGoodsGroup(Guid GoodsId, List<string> Adds, List<string> Removes, CancellationToken cancellationToken)
    {
        if (Removes != null && Removes.Count() > 0)
        {
            var RemovingEntities = _context.GoodsGroupMembers.Where(x => x.GoodsId == GoodsId && Removes.Contains(x.GoodsGroupId.ToString())).ToList();
            _context.GoodsGroupMembers.RemoveRange(RemovingEntities);
            await _context.SaveChangesAsync(cancellationToken);
        }
        if (Adds != null && Adds.Count() > 0)
        {
            var AddingEntities = new List<GoodsGroupMember>();

            for (int i = 0; i < Adds.Count(); i++)
            {
                AddingEntities.Add(new GoodsGroupMember
                {
                    GoodsId = GoodsId,
                    GoodsGroupId = Guid.Parse(Adds.ElementAt(i))
                });
            }
            _context.GoodsGroupMembers.AddRange(AddingEntities);
            await _context.SaveChangesAsync(cancellationToken);
        }

    }

    public async Task<GoodsPrice> AddGoodsPrice(Guid goodsId, decimal Price,  CancellationToken cancellationToken)
    {
        var entity = new GoodsPrice
        {
            End = null,
            Price = Price,
            Start = this._tanggal.Now,
            GoodsId = goodsId,
        };
        _context.GoodsPrices.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }
    public async Task<GoodsWholesalePrice> AddGoodsWholesalePrice(Guid goodsId, decimal WholesalerPrice, int WholesalerMin , CancellationToken cancellationToken)
    {

        var entity = new GoodsWholesalePrice
        {
            End = null,
            Start = this._tanggal.Now,
            WholesalerPrice = WholesalerPrice,
            GoodsId = goodsId,
            WholesalerMin = WholesalerMin
        };
        _context.GoodsWholesalePrices.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        
        return entity;
    }
    public async Task<List<GoodsWholesalePrice>> AddGoodsWholesalePrices(Guid goodsId, List<WholesalesPrice> wholesalesprices, CancellationToken cancellationToken)
    {
        List<GoodsWholesalePrice> entities = new List<GoodsWholesalePrice>();
        if (wholesalesprices != null && wholesalesprices.Count()>0)
        {
            foreach (var w in wholesalesprices)
            {
                var entity = new GoodsWholesalePrice
                {
                    End = null,
                    Start = this._tanggal.Now,
                    WholesalerPrice = w.WholesalerPrice,
                    GoodsId = goodsId,
                    WholesalerMin = w.WholesalerMin
                };
                _context.GoodsWholesalePrices.Add(entity);

                await _context.SaveChangesAsync(cancellationToken);
                entities.Add(entity);
            }
        }
        
        return entities;
    }

    public async Task<GoodsStock> AddGoodsStocks(Guid goodsId, int N, int Threshold, CancellationToken cancellationToken)
    {
        var entity = new GoodsStock
        {
            N = N,
            Threshold = Threshold,
            GoodsId = goodsId
        };
        _context.GoodsStocks.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }
    public async Task<AddStockHistory> AddStockHistory(Guid goodsStockId, int N, decimal BuyPrice, CancellationToken cancellationToken)
    {
        var entity = new AddStockHistory
        {
            GoodsStockId = goodsStockId,
            N = N,
            PricePerItem = BuyPrice,
            PriceTotal = BuyPrice * N,
            BasePrice = BuyPrice,
            PriceChange = 0
        };
        _context.AddStockHistories.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }

}
