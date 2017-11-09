using Autofac;
using Core.Cache.Interface;
using Core.Infrastructure;
using System.Collections.Generic;
using System.Linq;

namespace VNMuasam.WEB
{
    public class AutoJob : IAutoJob
    {
        #region StartJob

        /// <summary>
        /// StartJob
        /// </summary>
        /// <param name="config"></param>
        public void StartJob(InfrastructureConfig config)
        {
            //NLog.Logger _logger = GlobalConfiguration.Configuration.DependencyResolver.GetServices(typeof(NLog.Logger)).OfType<NLog.Logger>().SingleOrDefault();
            //ICacheManager _memCache = GlobalConfiguration.Configuration.DependencyResolver
            //  .GetServices(typeof(IIndex<CacheType, ICacheManager>)).OfType<IIndex<CacheType, ICacheManager>>().SingleOrDefault()[CacheType.MemoryCache];

            //IRedisPubSub _redisPubSub = GlobalConfiguration.Configuration.DependencyResolver.GetServices(typeof(IRedisPubSub)).OfType<IRedisPubSub>().SingleOrDefault();

            //ICacheManager _objRedisCache = GlobalConfiguration.Configuration.DependencyResolver
            //  .GetServices(typeof(IIndex<CacheType, ICacheManager>)).OfType<IIndex<CacheType, ICacheManager>>().SingleOrDefault()[CacheType.RedisCache];
            //if (config.IsUseRedisCache && config.UseAppCache)
            //{
            //    _redisPubSub.SubcribeMessage((m) =>
            //    {
            //        try
            //        {
            //            if (m?.Length > 0)
            //            {
            //                _memCache.RemoveByPattern(m);
            //                _objRedisCache.RemoveByPattern(m);
            //                _logger.Trace("[" + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss") + "]" + Environment.NewLine + "Sub from db " + m);
            //            }
            //        }
            //        catch (Exception ex)
            //        {
            //            //log here
            //            _logger.Trace("[" + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss") + "]" + Environment.NewLine + "Sub from db " + m + " " + ex.Message);
            //        }
            //    });
            //}
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="config"></param>
        public void StartJob_bk(InfrastructureConfig config)
        {
            //ICacheManager _memCache = GlobalConfiguration.Configuration.DependencyResolver
            //  .GetServices(typeof(IIndex<CacheType, ICacheManager>)).OfType<IIndex<CacheType, ICacheManager>>().SingleOrDefault()[CacheType.MemoryCache];
            //IRedisPubSub _redisPubSub = GlobalConfiguration.Configuration.DependencyResolver.GetServices(typeof(IRedisPubSub)).OfType<IRedisPubSub>().SingleOrDefault();
            //if (config.IsUseRedisCache && config.UseAppCache)
            //{
            //    _redisPubSub.SubcribeMessage((m) =>
            //    {
            //        try
            //        {
            //            if (m?.Length > 0)
            //            {
            //                //Get message from sub chanel redis
            //                string tableName = m.Split(',')[0];
            //                string tableNameRes = tableName + "Res";
            //                string dataJson = m.Substring(tableName.Length + 1, m.Length - tableName.Length - 1);
            //                //message is json send from ws via redis pubsub message
            //                //convert message to object
            //                //create instant from table name (table name the same model entity)
            //                foreach (var type in VNMuasam.Business.DTO.Helper.FuncHelper.GetListOfEntryAssemblyWithReferences())
            //                    foreach (var item in type.GetTypes())
            //                        if (item.Name == tableNameRes && item.GetConstructor(Type.EmptyTypes) != null)
            //                        {
            //                            var itemInstant = Activator.CreateInstance(item);
            //                            //Get info itemInstant convert to clear type
            //                            Type typeArgument = itemInstant.GetType();
            //                            //genericClass
            //                            Type genericClass = typeof(UpdateDatas<>);
            //                            // MakeGenericType is badly named
            //                            Type constructedClass = genericClass.MakeGenericType(typeArgument);
            //                            //Create instant
            //                            object created = Activator.CreateInstance(constructedClass);
            //                            MethodInfo method = created.GetType().GetMethod("ConvertJsonToListData");
            //                            //execute method
            //                            var listData = method.Invoke(created, new object[] { dataJson });
            //                            method = created.GetType().GetMethod("UpdateCache");
            //                            //execute method
            //                            method.Invoke(created, new object[] { tableName, listData, _memCache });
            //                        }

            //                //var itemInstant = (from t in VNMuasam.Business.DTO.Helper.FuncHelper.GetListOfEntryAssemblyWithReferences()
            //                //                   where t.GetTypes().Select(i => i.Name == tableNameRes && i.GetConstructor(Type.EmptyTypes) != null).Count() > 0
            //                //                   select Activator.CreateInstance((from t2 in t.GetTypes() where t2.Name == tableNameRes select t2).SingleOrDefault())).SingleOrDefault();

            //            }
            //        }
            //        catch (Exception ex)
            //        {
            //            //log here
            //        }
            //    });
            //}
        }

        #endregion StartJob
    }

    #region UpdateDatas class

    /// <summary>
    /// Class map data from queue message
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class UpdateDatas<T>
    {
        /// <summary>
        /// ConvertJsonToListData
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public List<T> ConvertJsonToListData(string json)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<List<T>>(json);
        }

        /// <summary>
        /// UpdateCache
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="listData"></param>
        /// <param name="memCacheManager"></param>
        public void UpdateCache(string tableName, List<T> listData, ICacheManager memCacheManager)
        {
            //reset memcache
            var dataCache = memCacheManager.Get<List<T>>("SCM." + tableName);
            var data2 = memCacheManager.Get<IEnumerable<T>>("SCM." + tableName);
            //update datacache from listData
            foreach (T item in listData)
            {
                //Get primarykey of table (model)
                var itemID = item.GetType().GetProperties().First().GetValue(item);
                //Get item by primarykey
                var itemInCache = dataCache.Where(x => x.GetType().GetProperty(item.GetType().GetProperties().First().Name).GetValue(x).ToString() == itemID.ToString()).First();
                if (itemInCache != null)//Exist case update
                {
                    foreach (var pro in itemInCache.GetType().GetProperties())
                    {
                        var value = item.GetType().GetProperty(pro.Name).GetValue(item);
                        itemInCache.GetType().GetProperty(pro.Name).SetValue(itemInCache, value, null);
                    }
                }
                else//Not exist case insert
                {
                    dataCache.Add(item);
                }
            }
            memCacheManager.Set<List<T>>("SCM." + tableName, dataCache);
        }
    }

    #endregion UpdateDatas class
}