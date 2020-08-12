using GSAInitialBE.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace GSAInitialBE.DataLayers
{
    public class ProductDataAccessLayer
    {
        public List<Product> GetAllProduct()
        {
            string connectionString = "Server=.\\SQLExpress; Database = gsa-db;Trusted_Connection = Yes";
            string storedProcedureName = "spProduct_GetAll";

            List<Models.Product> products = new List<Models.Product>();

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                try
                {
                    using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter())
                    {
                        sqlDataAdapter.SelectCommand = new SqlCommand(storedProcedureName, sqlConnection);
                        sqlDataAdapter.SelectCommand.CommandType = CommandType.StoredProcedure;

                        DataSet dataset = new DataSet();
                        sqlDataAdapter.Fill(dataset, "products");

                        DataTable dataTable = dataset.Tables["products"];

                        foreach (DataRow row in dataTable.Rows)
                        {
                            Product product = new Product 
                            {
                                Id = (int)row.ItemArray[0], 
                                Name = (string)row.ItemArray[1],
                                Price = (int)row.ItemArray[2],
                                Quantity = (int)row.ItemArray[3]
                            };
                            products.Add(product);
                        }
                    }
                }
                catch (SqlException ex)
                {

                }
                catch (Exception e)
                {

                }
            }
            return products;
        }

        public Product GetProduct(int id)
        {
            string connectionString = "Server=.\\SQLExpress; Database = gsa-db;Trusted_Connection = Yes";
            string storedProcedureName = "spProduct_GetOne";
            Product product = new Product();
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                try
                {
                    using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter())
                    {
                        sqlDataAdapter.SelectCommand = new SqlCommand(storedProcedureName, sqlConnection);
                        sqlDataAdapter.SelectCommand.CommandType = CommandType.StoredProcedure;

                        sqlDataAdapter.SelectCommand.Parameters.Add("@Id", SqlDbType.Int).Value = id;


                        DataSet dataset = new DataSet();
                        sqlDataAdapter.Fill(dataset, "products");

                        DataTable dataTable = dataset.Tables["products"];

                        foreach (DataRow row in dataTable.Rows)
                        {
                            product = new Product
                            {
                                Id = (int)row.ItemArray[0],
                                Name = (string)row.ItemArray[1],
                                Price = (int)row.ItemArray[2],
                                Quantity = (int)row.ItemArray[3]
                            };
                        }
                    }
                }
                catch (SqlException ex)
                {

                }
                catch (Exception e)
                {

                }
            }
            return product;
        }

        public int AddNewProduct(Product product)
        {
            string connectionString = "Server=.\\SQLExpress; Database = gsa-db;Trusted_Connection = Yes";
            string storedProcedureName = "spProduct_Add";
            int id = -1971;

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                try
                {
                    using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter())
                    {
                        SqlCommand sqlCommand = new SqlCommand(storedProcedureName, sqlConnection);
                        SqlParameter outPutVal = new SqlParameter("@Id", SqlDbType.Int);

                        outPutVal.Direction = ParameterDirection.Output;
                        sqlCommand.Parameters.Add(outPutVal);

                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@Name", SqlDbType.VarChar).Value = product.Name;
                        sqlCommand.Parameters.AddWithValue("@Price", SqlDbType.Int).Value = product.Price;
                        sqlCommand.Parameters.AddWithValue("@Quantity", SqlDbType.Int).Value = product.Quantity;

                        sqlConnection.Open();
                        sqlCommand.ExecuteNonQuery();

                        if (outPutVal.Value != DBNull.Value)
                        {
                             id = Convert.ToInt32(outPutVal.Value);
                        }
                        sqlConnection.Close();

                    }

                }
                catch (SqlException ex)
                {

                }
                catch (Exception e)
                {

                }
            }
            return id; 
        }


        public void EditProduct(Product product)
        {
            string connectionString = "Server=.\\SQLExpress; Database = gsa-db;Trusted_Connection = Yes";
            string storedProcedureName = "spProduct_Edit";

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                try
                {
                    using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter())
                    {

                        sqlConnection.Open();

                        SqlCommand sqlCommand = new SqlCommand(storedProcedureName, sqlConnection);
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@Id", SqlDbType.Int).Value = product.Id;
                        sqlCommand.Parameters.AddWithValue("@Name", SqlDbType.VarChar).Value = product.Name;
                        sqlCommand.Parameters.AddWithValue("@Price", SqlDbType.Int).Value = product.Price;
                        sqlCommand.Parameters.AddWithValue("@Quantity", SqlDbType.Int).Value = product.Quantity;
                        sqlCommand.ExecuteNonQuery();

                        sqlConnection.Close();

                    }
                }
                catch (SqlException ex)
                {

                }
                catch (Exception e)
                {

                }
            }
        }


        public void DeleteProduct(int id)
        {
            string connectionString = "Server=.\\SQLExpress; Database = gsa-db;Trusted_Connection = Yes";
            string storedProcedureName = "spProduct_Delete";

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                try
                {
                    using (SqlDataAdapter sqlDataAdapter = new SqlDataAdapter())
                    {

                        sqlConnection.Open();

                        SqlCommand sqlCommand = new SqlCommand(storedProcedureName, sqlConnection);
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("@Id", SqlDbType.VarChar).Value = id;
                        sqlCommand.ExecuteNonQuery();

                        sqlConnection.Close();

                    }
                }
                catch (SqlException ex)
                {

                }
                catch (Exception e)
                {

                }
            }
        }
    }
}