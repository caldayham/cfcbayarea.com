import { model, models } from 'mongoose';
import { PortfolioItemSchema } from './schemas';
import type { 
  IPortfolioItem, 
  IPortfolioItemModel,
  CreatePortfolioItemInput,
  UpdatePortfolioItemInput,
  ContentBlock,
  TextBlockContent,
  ImageBlockContent,
  GalleryBlockContent,
  QuoteBlockContent,
  BeforeAfterBlockContent,
  CalloutBlockContent
} from './interfaces';

// ============ MODEL EXPORT ============

/**
 * Portfolio Item Model - use this for all database operations
 * Prevents OverwriteModelError in development
 * Properly typed with both instance and static methods
 */
const PortfolioItemModel = (
  models.PortfolioItem || 
  model<IPortfolioItem>('PortfolioItem', PortfolioItemSchema)
) as IPortfolioItemModel;

export default PortfolioItemModel;

// ============ RE-EXPORT TYPES ============
// This allows importing types from the main index file

export type {
  IPortfolioItem,
  IPortfolioItemModel,
  CreatePortfolioItemInput,
  UpdatePortfolioItemInput,
  ContentBlock,
  TextBlockContent,
  ImageBlockContent,
  GalleryBlockContent,
  QuoteBlockContent,
  BeforeAfterBlockContent,
  CalloutBlockContent
};