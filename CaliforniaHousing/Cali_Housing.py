# -*- coding: utf-8 -*-
"""
Created on Thu Jul  2 09:03:45 2020

@author: myatkaung
"""


import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

housing = pd.read_csv('housing.txt', sep = ',')
pd.set_option('display.expand_frame_repr', False)
pd.set_option('float_format', '{:.3f}'.format)

housing.head()
housing.info()
housing.describe()
housing['ocean_proximity'].value_counts()
housing.isnull().sum()

housing.hist(bins=50, figsize=(20,15))
plt.show()

# to make this notebook's output identical at every run
np.random.seed(42)

housing["median_income"].hist()

housing.plot(kind="scatter", x="longitude", y="latitude", alpha=0.1)
plt.title('Housing Concentration Scatterplot')

housing.plot(kind="scatter", x="longitude", y="latitude", alpha=0.4,
    s=housing["population"]/100, label="population", figsize=(10,7),
    c="median_house_value", cmap=plt.get_cmap("jet"), colorbar=True,
    sharex=False)
plt.title('Housing Prices Scatterplot')
plt.legend()

import matplotlib.image as mpimg
california_img=mpimg.imread('california_gmap.png')
ax = housing.plot(kind="scatter", x="longitude", y="latitude", figsize=(10,7),
                       s=housing['population']/100, label="Population",
                       c="median_house_value", cmap=plt.get_cmap("jet"),
                       colorbar=False, alpha=0.4,
                      )
plt.imshow(california_img, extent=[-124.55, -113.80, 32.45, 42.05], alpha=0.5,
           cmap=plt.get_cmap("jet"))
plt.ylabel("Latitude", fontsize=14)
plt.xlabel("Longitude", fontsize=14)

prices = housing["median_house_value"]
tick_values = np.linspace(prices.min(), prices.max(), 11)
cbar = plt.colorbar()
cbar.ax.set_yticklabels(["$%dk"%(round(v/1000)) for v in tick_values], fontsize=14)
cbar.set_label('Median House Value', fontsize=16)

plt.legend(fontsize=16)
plt.title('california_housing_prices_plot')
plt.show()

sns.pairplot(housing, vars=['total_rooms','housing_median_age', 'median_income', 'median_house_value'], 
             diag_kind="kde", kind='scatter', plot_kws={'alpha':0.1})
plt.show()

temp_housing = housing.copy()
temp_housing["rooms_per_household"] = temp_housing["total_rooms"]/housing["households"]
temp_housing["bedrooms_per_room"] = temp_housing["total_bedrooms"]/housing["total_rooms"]
temp_housing["population_per_household"] = temp_housing["population"]/housing["households"]

corr_matrix = temp_housing.corr()
corr_matrix["median_house_value"].sort_values(ascending=False)


temp_housing.plot(kind="scatter", x="rooms_per_household", y="median_house_value",
             alpha=0.2)
plt.axis([0, 40, 0, 520000])
plt.show()

# dummy_housing = housing.copy()

# # One Hot Encoding the "ocean_proximity" column
# from sklearn.compose import ColumnTransformer
# from sklearn.preprocessing import OneHotEncoder
# ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [9])], remainder='passthrough')
# dummy_housing = np.array(ct.fit_transform(dummy_housing))
# print(dummy_housing)


# try:
#     from sklearn.impute import SimpleImputer # Scikit-Learn 0.20+
# except ImportError:
#     from sklearn.preprocessing import Imputer as SimpleImputer

# imputer = SimpleImputer(strategy="median")

# imputer.fit(dummy_housing)
# non_null_housing = imputer.transform(dummy_housing)

# housing_df = pd.DataFrame(non_null_housing)
# housing_df.isnull().sum()

#housing_df.columns = ['0','1','2','3','4','longitude','latitude','housing_median_age','total_rooms','total_bedrooms','population','households','median_income','median_house_value','rooms_per_household','bedrooms_per_room','population_per_household']

# corr_matrix = housing_df.corr()
# corr_matrix["median_house_value"].sort_values(ascending=False)

housing["income_cat"] = pd.cut(housing["median_income"],
                               bins=[0., 1.5, 3.0, 4.5, 6., np.inf],
                               labels=['0-1.5', '1.5-3', '3-4.5', '4.5-6', '>6'])

housing["income_cat"].value_counts()
housing["income_cat"].hist()
# housing = housing_df.drop(['bedrooms_per_room'], axis = 1)

# X = housing_df.drop(['median_house_value'], axis = 1)
# y = housing_df['median_house_value']

#Checking VIF//////////////////////////////////////////////////////////////////////////////////////////// 
# Function to calculate VIF
# import statsmodels.api as sm
# def calculate_vif(data):
#     vif_df = pd.DataFrame(columns = ['Var', 'Vif'])
#     x_var_names = data.columns
#     for i in range(0, x_var_names.shape[0]):
#         y = data[x_var_names[i]]
#         x = data[x_var_names.drop([x_var_names[i]])]
#         r_squared = sm.OLS(y,x).fit().rsquared
#         vif = round(1/(1-r_squared),2)
#         vif_df.loc[i] = [x_var_names[i], vif]
#     return vif_df.sort_values(by = 'Vif', axis = 0, ascending=False, inplace=False)

# check = X.iloc[:, 0:6]
# calculate_vif(check)

# check = check.drop(['0'], axis = 1)
# calculate_vif(check)

# X = X.drop(['0'], axis = 1)

#Checking VIF complete/////////////////////////////////////////////////////////////////////////////////////

#Using Stratified Shuffle Split////////////////////////////////////////////////////////////////////////////



from sklearn.model_selection import StratifiedShuffleSplit
split1 = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=42)
for train_index, test_index in split1.split(housing, housing["income_cat"]):
    stratified_train_set = housing.loc[train_index]
    stratified_test_set = housing.loc[test_index]
#Stratified Shuffle Split complete///////////////////////////////////////////////////////////////////////////
    
#Following are for why use sss explanation. No need to add in actual code////////////////////////////////////

housing["income_cat"].value_counts()
len(housing)
housing["income_cat"].value_counts() / len(housing)

stratified_train_set["income_cat"].value_counts()
len(stratified_train_set)
stratified_train_set["income_cat"].value_counts() / len(stratified_train_set)

stratified_test_set["income_cat"].value_counts()
len(stratified_test_set)
stratified_test_set["income_cat"].value_counts() / len(stratified_test_set)

def income_cat_proportions(data):
    return data["income_cat"].value_counts() / len(data)

from sklearn.model_selection import train_test_split
rand_train_set, rand_test_set = train_test_split(housing, test_size=0.2, random_state=42)

compare_proportions = pd.DataFrame({
                            "Overall%": income_cat_proportions(housing) * 100,
                            "Stratified%": income_cat_proportions(stratified_test_set) * 100,
                            "Random%": income_cat_proportions(rand_test_set) * 100,
                            }).sort_index()
compare_proportions["Rand. %error"] = ( 100 * ( compare_proportions["Random%"] / compare_proportions["Overall%"] ) )- 100
compare_proportions["Strat. %error"] = ( 100 * ( compare_proportions["Stratified%"] / compare_proportions["Overall%"] ) ) - 100
compare_proportions

#Why Use SSS explanation finish//////////////////////////////////////////////////////////////////////////////


split = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=42)
for train_index, test_index in split.split(housing, housing["income_cat"]):
    stratified_train_set = housing.loc[train_index]
    stratified_test_set = housing.loc[test_index]
    
#Since we no longer need income_cat column, we drop it
for set_ in (stratified_train_set, stratified_test_set):
     set_.drop("income_cat", axis=1, inplace=True)

stratified_housing = stratified_train_set.drop("median_house_value", axis=1)
housing_target = stratified_train_set.copy()

#Let's split new_housing into number value only as new_housing_num and categorical value only as new_housing_cat

stratified_housing_num = stratified_housing.drop('ocean_proximity', axis = 1)
stratified_housing_cat = stratified_housing['ocean_proximity'].copy()


#Adding required libraries for building piplines
#Pipeline will include imputer, scaler, one-hot encoding and adding new features

#for adding new features
from sklearn.preprocessing import FunctionTransformer
def add_extra_features(X, add_bedrooms_per_room=True):
    rooms_per_household = X[:, 'total_rooms'] / X[:, 'households']
    population_per_household = X[:, 'population'] / X[:, 'households']
    if add_bedrooms_per_room:
        bedrooms_per_room = X[:, 'total_bedrooms'] / X[:, 'total_rooms']
        return np.c_[X, rooms_per_household, population_per_household,
                     bedrooms_per_room]
    else:
        return np.c_[X, rooms_per_household, population_per_household]


#For importing remaining lib    
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import StandardScaler
try:
    from sklearn.impute import SimpleImputer
except ImportError:
    from sklearn.preprocessing import Imputer as SimpleImputer
    
from sklearn.pipeline import Pipeline
number_pipeline = Pipeline([
                                ('imputer', SimpleImputer(strategy="median")),
                                #('attribs_adder', FunctionTransformer(add_extra_features, validate=False, kw_args={"add_bedrooms_per_room": False})),
                                ('std_scaler', StandardScaler())
                          ])

stratified_housing_num_tr = number_pipeline.fit_transform(stratified_housing_num)

num_attribs = list(stratified_housing_num)
cat_attribs = ["ocean_proximity"]

full_pipeline = ColumnTransformer([
                                    ("num", number_pipeline, num_attribs),
                                    ("cat", OneHotEncoder(), cat_attribs),
                                ])

housing_prepared = full_pipeline.fit_transform(stratified_housing)

from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVR

models = []
models.append(('(LinearRegression)', LinearRegression()))
models.append(('(Decision Tree Reg)', DecisionTreeRegressor()))
models.append(('(Random Forest Reg)', RandomForestRegressor()))
models.append(('(SVR)', SVR()))

from sklearn.model_selection import cross_validate
for name, model in models:
    split = StratifiedShuffleSplit(n_splits=10, test_size=0.2, random_state=42)
    cv_res = cross_validate(model, housing_prepared, housing_target, scoring = ['neg_root_mean_squared_error', 'r2'], cv = split)
    print('RMSE : ',"{:.3f}".format(-cv_res['test_neg_root_mean_squared_error'].mean()), ', ', 
          'R2 : ', "{:.3f}".format(cv_res['test_r2'].mean()),  name)
























