const { sequelize } = require("../db");
const Manufacturer = require('./manufacturer');
const Country = require('./country');
const Continent = require('./continent');
const City = require('./city');
const ServiceCenter = require('./service_center');
const ProvidedService = require('./provided_service');

const DimensionAppliance = require('./dimension_appliance');
const DimensionDate = require('./dimension_date');
const DimensionLocation = require('./dimension_location');
const DimensionManufacturerCountry = require('./dimension_manufacturer_country');

const FactServiceQuantity = require('./fact_service_quantity')
const FactServiceVolume = require('./fact_service_volume')

// Manufacturer
Manufacturer.belongsTo(Country, { foreignKey: 'countryId' });

// City
City.hasMany(ServiceCenter, { foreignKey: 'cityId' });
City.belongsTo(Country, { foreignKey: 'countryId' });

// Continent
Continent.hasMany(Country, { foreignKey: 'continentId' });

// Country
Country.belongsTo(Continent, { foreignKey: 'continentId' });
Country.hasMany(City, { foreignKey: 'countryId' });
Country.hasMany(Manufacturer, { foreignKey: 'countryId' });

// ProvidedService
ProvidedService.belongsTo(Manufacturer, { foreignKey: 'manufacturerId' });
ProvidedService.belongsTo(ServiceCenter, { foreignKey: 'serviceCenterId' });
ProvidedService.belongsToMany(DimensionAppliance, { through: 'ProvidedServiceAppliance' });

// Service Center
ServiceCenter.belongsTo(City, { foreignKey: 'cityId' });
ServiceCenter.hasMany(ProvidedService, { foreignKey: 'serviceCenterId' });

// FACTS VOLUME
FactServiceVolume.belongsTo(DimensionDate);
FactServiceVolume.belongsTo(DimensionManufacturerCountry);
FactServiceVolume.belongsTo(DimensionLocation);
DimensionDate.hasMany(FactServiceVolume);
DimensionDate.hasMany(FactServiceQuantity);
DimensionLocation.hasMany(FactServiceVolume);

// QUANTITY
FactServiceQuantity.belongsTo(ProvidedService, { foreignKey: 'provided_service_id' });
FactServiceQuantity.belongsTo(DimensionDate);
FactServiceQuantity.belongsTo(DimensionLocation);
FactServiceQuantity.belongsTo(DimensionManufacturerCountry);

// DIMENSIONS ASSOC W PROVIDED SERVICES
ProvidedService.belongsTo(DimensionAppliance);
ProvidedService.belongsTo(DimensionDate);
ProvidedService.belongsTo(DimensionLocation);
ProvidedService.belongsTo(DimensionManufacturerCountry);

DimensionAppliance.hasMany(ProvidedService);
DimensionDate.hasMany(ProvidedService);
DimensionLocation.hasMany(ProvidedService);
DimensionManufacturerCountry.hasMany(ProvidedService);
