import { mapEnumToOptions } from '@abp/ng.core';

export enum MeasurementUnit {
  Gram = 0,
  Kilogram = 1,
  Milliliter = 2,
  Liter = 3,
  Teaspoon = 4,
  Tablespoon = 5,
  Cup = 6,
  Piece = 7,
}

export const measurementUnitOptions = mapEnumToOptions(MeasurementUnit);
