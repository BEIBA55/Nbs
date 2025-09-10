import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { searchAPI } from '../services/api';

export const useSearch = (query, filters = {}) => {
  const { t } = useTranslation();
  
  return useQuery({
    queryKey: ['search', query, filters],
    queryFn: () => searchAPI.search(query, filters, t),
    enabled: !!query && query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 минут
    cacheTime: 10 * 60 * 1000, // 10 минут
  });
};

export const useSearchSuggestions = (query) => {
  const { t } = useTranslation();
  
  return useQuery({
    queryKey: ['searchSuggestions', query],
    queryFn: () => searchAPI.getSearchSuggestions(query, t),
    enabled: !!query && query.trim().length > 1,
    staleTime: 2 * 60 * 1000, // 2 минуты
    cacheTime: 5 * 60 * 1000, // 5 минут
  });
};

export const useSearchCategories = () => {
  const { t } = useTranslation();
  
  return useQuery({
    queryKey: ['searchCategories'],
    queryFn: () => searchAPI.getCategories(t),
    staleTime: 30 * 60 * 1000, // 30 минут
    cacheTime: 60 * 60 * 1000, // 1 час
  });
};

export const useSearchTypes = () => {
  return useQuery({
    queryKey: ['searchTypes'],
    queryFn: () => searchAPI.getTypes(),
    staleTime: 30 * 60 * 1000, // 30 минут
    cacheTime: 60 * 60 * 1000, // 1 час
  });
}; 