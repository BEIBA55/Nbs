import { useQuery } from '@tanstack/react-query';
import { searchAPI } from '../services/api';

export const useSearch = (query, filters = {}) => {
  return useQuery({
    queryKey: ['search', query, filters],
    queryFn: () => searchAPI.search(query, filters),
    enabled: !!query && query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 минут
    cacheTime: 10 * 60 * 1000, // 10 минут
  });
};

export const useSearchSuggestions = (query) => {
  return useQuery({
    queryKey: ['searchSuggestions', query],
    queryFn: () => searchAPI.getSearchSuggestions(query),
    enabled: !!query && query.trim().length > 1,
    staleTime: 2 * 60 * 1000, // 2 минуты
    cacheTime: 5 * 60 * 1000, // 5 минут
  });
};

export const useSearchCategories = () => {
  return useQuery({
    queryKey: ['searchCategories'],
    queryFn: () => searchAPI.getCategories(),
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