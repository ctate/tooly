import { z } from 'zod'

// Base URL and configuration
export const API_BASE_URL = ''

// Parameter schemas for each operation
export const ListVideoViewsSchema = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
  viewer_id: z.string().optional(),
  error_id: z.number().optional(),
  order_direction: z.string().optional(),
  filters__: z.array(z.any()).optional(),
  metric_filters__: z.array(z.any()).optional(),
  timeframe__: z.array(z.any()).optional(),
})

export const GetVideoViewSchema = z.object({
  VIDEO_VIEW_ID: z.string(),
})

export const ListErrorsSchema = z.object({
  filters__: z.array(z.any()).optional(),
  metric_filters__: z.array(z.any()).optional(),
  timeframe__: z.array(z.any()).optional(),
})

export const ListFiltersSchema = z.object({
})

export const ListFilterValuesSchema = z.object({
  FILTER_ID: z.string(),
  limit: z.number().optional(),
  page: z.number().optional(),
  filters__: z.array(z.any()).optional(),
  timeframe__: z.array(z.any()).optional(),
})

export const ListDimensionsSchema = z.object({
})

export const ListDimensionValuesSchema = z.object({
  DIMENSION_ID: z.string(),
  limit: z.number().optional(),
  page: z.number().optional(),
  filters__: z.array(z.any()).optional(),
  metric_filters__: z.array(z.any()).optional(),
  timeframe__: z.array(z.any()).optional(),
})

export const ListExportsSchema = z.object({
})

export const ListExportsViewsSchema = z.object({
})

export const ListBreakdownValuesSchema = z.object({
  METRIC_ID: z.string(),
  group_by: z.string().optional(),
  measurement: z.string().optional(),
  filters__: z.array(z.any()).optional(),
  metric_filters__: z.array(z.any()).optional(),
  limit: z.number().optional(),
  page: z.number().optional(),
  order_by: z.string().optional(),
  order_direction: z.string().optional(),
  timeframe__: z.array(z.any()).optional(),
})

export const GetOverallValuesSchema = z.object({
  METRIC_ID: z.string(),
  timeframe__: z.array(z.any()).optional(),
  filters__: z.array(z.any()).optional(),
  metric_filters__: z.array(z.any()).optional(),
  measurement: z.string().optional(),
})

export const ListInsightsSchema = z.object({
  METRIC_ID: z.string(),
  measurement: z.string().optional(),
  order_direction: z.string().optional(),
  timeframe__: z.array(z.any()).optional(),
  filters__: z.array(z.any()).optional(),
  metric_filters__: z.array(z.any()).optional(),
})

export const GetMetricTimeseriesDataSchema = z.object({
  METRIC_ID: z.string(),
  timeframe__: z.array(z.any()).optional(),
  filters__: z.array(z.any()).optional(),
  metric_filters__: z.array(z.any()).optional(),
  measurement: z.string().optional(),
  order_direction: z.string().optional(),
  group_by: z.string().optional(),
})

export const ListAllMetricValuesSchema = z.object({
  timeframe__: z.array(z.any()).optional(),
  filters__: z.array(z.any()).optional(),
  metric_filters__: z.array(z.any()).optional(),
  dimension: z.string().optional(),
  value: z.string().optional(),
})

export const ListMonitoringDimensionsSchema = z.object({
})

export const ListMonitoringMetricsSchema = z.object({
})

export const GetMonitoringBreakdownSchema = z.object({
  MONITORING_METRIC_ID: z.string(),
  dimension: z.string().optional(),
  timestamp: z.number().optional(),
  filters__: z.array(z.any()).optional(),
  order_by: z.string().optional(),
  order_direction: z.string().optional(),
})

export const GetMonitoringBreakdownTimeseriesSchema = z.object({
  MONITORING_METRIC_ID: z.string(),
  dimension: z.string().optional(),
  timeframe__: z.array(z.any()).optional(),
  filters__: z.array(z.any()).optional(),
  limit: z.number().optional(),
  order_by: z.string().optional(),
  order_direction: z.string().optional(),
})

export const GetMonitoringHistogramTimeseriesSchema = z.object({
  MONITORING_HISTOGRAM_METRIC_ID: z.string(),
  filters__: z.array(z.any()).optional(),
})

export const GetMonitoringTimeseriesSchema = z.object({
  MONITORING_METRIC_ID: z.string(),
  filters__: z.array(z.any()).optional(),
  timestamp: z.number().optional(),
})

export const ListRealtimeDimensionsSchema = z.object({
})

export const ListRealtimeMetricsSchema = z.object({
})

export const GetRealtimeBreakdownSchema = z.object({
  REALTIME_METRIC_ID: z.string(),
  dimension: z.string().optional(),
  timestamp: z.number().optional(),
  filters__: z.array(z.any()).optional(),
  order_by: z.string().optional(),
  order_direction: z.string().optional(),
})

export const GetRealtimeHistogramTimeseriesSchema = z.object({
  REALTIME_HISTOGRAM_METRIC_ID: z.string(),
  filters__: z.array(z.any()).optional(),
})

export const GetRealtimeTimeseriesSchema = z.object({
  REALTIME_METRIC_ID: z.string(),
  filters__: z.array(z.any()).optional(),
  timestamp: z.number().optional(),
})

export const ListIncidentsSchema = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
  order_by: z.string().optional(),
  order_direction: z.string().optional(),
  status: z.string().optional(),
  severity: z.string().optional(),
})

export const GetIncidentSchema = z.object({
  INCIDENT_ID: z.string(),
})

export const ListRelatedIncidentsSchema = z.object({
  INCIDENT_ID: z.string(),
  limit: z.number().optional(),
  page: z.number().optional(),
  order_by: z.string().optional(),
  order_direction: z.string().optional(),
})

export const ListAnnotationsSchema = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
  order_direction: z.string().optional(),
  timeframe__: z.array(z.any()).optional(),
})

export const CreateAnnotationSchema = z.object({
  body: z.any(),
})

export const GetAnnotationSchema = z.object({
  ANNOTATION_ID: z.string(),
})

export const UpdateAnnotationSchema = z.object({
  ANNOTATION_ID: z.string(),
  body: z.any(),
})

export const DeleteAnnotationSchema = z.object({
  ANNOTATION_ID: z.string(),
})


// Response types
export interface ListVideoViewsResponse {
  success: boolean
  data?: any
  error?: string
}

export interface GetVideoViewResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListErrorsResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListFiltersResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListFilterValuesResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListDimensionsResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListDimensionValuesResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListExportsResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListExportsViewsResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListBreakdownValuesResponse {
  success: boolean
  data?: any
  error?: string
}

export interface GetOverallValuesResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListInsightsResponse {
  success: boolean
  data?: any
  error?: string
}

export interface GetMetricTimeseriesDataResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListAllMetricValuesResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListMonitoringDimensionsResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListMonitoringMetricsResponse {
  success: boolean
  data?: any
  error?: string
}

export interface GetMonitoringBreakdownResponse {
  success: boolean
  data?: any
  error?: string
}

export interface GetMonitoringBreakdownTimeseriesResponse {
  success: boolean
  data?: any
  error?: string
}

export interface GetMonitoringHistogramTimeseriesResponse {
  success: boolean
  data?: any
  error?: string
}

export interface GetMonitoringTimeseriesResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListRealtimeDimensionsResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListRealtimeMetricsResponse {
  success: boolean
  data?: any
  error?: string
}

export interface GetRealtimeBreakdownResponse {
  success: boolean
  data?: any
  error?: string
}

export interface GetRealtimeHistogramTimeseriesResponse {
  success: boolean
  data?: any
  error?: string
}

export interface GetRealtimeTimeseriesResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListIncidentsResponse {
  success: boolean
  data?: any
  error?: string
}

export interface GetIncidentResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListRelatedIncidentsResponse {
  success: boolean
  data?: any
  error?: string
}

export interface ListAnnotationsResponse {
  success: boolean
  data?: any
  error?: string
}

export interface CreateAnnotationResponse {
  success: boolean
  data?: any
  error?: string
}

export interface GetAnnotationResponse {
  success: boolean
  data?: any
  error?: string
}

export interface UpdateAnnotationResponse {
  success: boolean
  data?: any
  error?: string
}

export interface DeleteAnnotationResponse {
  success: boolean
  data?: any
  error?: string
}


// Parameter types
export type ListVideoViewsParams = z.infer<typeof ListVideoViewsSchema>
export type GetVideoViewParams = z.infer<typeof GetVideoViewSchema>
export type ListErrorsParams = z.infer<typeof ListErrorsSchema>
export type ListFiltersParams = z.infer<typeof ListFiltersSchema>
export type ListFilterValuesParams = z.infer<typeof ListFilterValuesSchema>
export type ListDimensionsParams = z.infer<typeof ListDimensionsSchema>
export type ListDimensionValuesParams = z.infer<typeof ListDimensionValuesSchema>
export type ListExportsParams = z.infer<typeof ListExportsSchema>
export type ListExportsViewsParams = z.infer<typeof ListExportsViewsSchema>
export type ListBreakdownValuesParams = z.infer<typeof ListBreakdownValuesSchema>
export type GetOverallValuesParams = z.infer<typeof GetOverallValuesSchema>
export type ListInsightsParams = z.infer<typeof ListInsightsSchema>
export type GetMetricTimeseriesDataParams = z.infer<typeof GetMetricTimeseriesDataSchema>
export type ListAllMetricValuesParams = z.infer<typeof ListAllMetricValuesSchema>
export type ListMonitoringDimensionsParams = z.infer<typeof ListMonitoringDimensionsSchema>
export type ListMonitoringMetricsParams = z.infer<typeof ListMonitoringMetricsSchema>
export type GetMonitoringBreakdownParams = z.infer<typeof GetMonitoringBreakdownSchema>
export type GetMonitoringBreakdownTimeseriesParams = z.infer<typeof GetMonitoringBreakdownTimeseriesSchema>
export type GetMonitoringHistogramTimeseriesParams = z.infer<typeof GetMonitoringHistogramTimeseriesSchema>
export type GetMonitoringTimeseriesParams = z.infer<typeof GetMonitoringTimeseriesSchema>
export type ListRealtimeDimensionsParams = z.infer<typeof ListRealtimeDimensionsSchema>
export type ListRealtimeMetricsParams = z.infer<typeof ListRealtimeMetricsSchema>
export type GetRealtimeBreakdownParams = z.infer<typeof GetRealtimeBreakdownSchema>
export type GetRealtimeHistogramTimeseriesParams = z.infer<typeof GetRealtimeHistogramTimeseriesSchema>
export type GetRealtimeTimeseriesParams = z.infer<typeof GetRealtimeTimeseriesSchema>
export type ListIncidentsParams = z.infer<typeof ListIncidentsSchema>
export type GetIncidentParams = z.infer<typeof GetIncidentSchema>
export type ListRelatedIncidentsParams = z.infer<typeof ListRelatedIncidentsSchema>
export type ListAnnotationsParams = z.infer<typeof ListAnnotationsSchema>
export type CreateAnnotationParams = z.infer<typeof CreateAnnotationSchema>
export type GetAnnotationParams = z.infer<typeof GetAnnotationSchema>
export type UpdateAnnotationParams = z.infer<typeof UpdateAnnotationSchema>
export type DeleteAnnotationParams = z.infer<typeof DeleteAnnotationSchema>

// Export all schemas for validation
export const toolParameterSchemas = {
  listVideoViews: ListVideoViewsSchema,
  getVideoView: GetVideoViewSchema,
  listErrors: ListErrorsSchema,
  listFilters: ListFiltersSchema,
  listFilterValues: ListFilterValuesSchema,
  listDimensions: ListDimensionsSchema,
  listDimensionValues: ListDimensionValuesSchema,
  listExports: ListExportsSchema,
  listExportsViews: ListExportsViewsSchema,
  listBreakdownValues: ListBreakdownValuesSchema,
  getOverallValues: GetOverallValuesSchema,
  listInsights: ListInsightsSchema,
  getMetricTimeseriesData: GetMetricTimeseriesDataSchema,
  listAllMetricValues: ListAllMetricValuesSchema,
  listMonitoringDimensions: ListMonitoringDimensionsSchema,
  listMonitoringMetrics: ListMonitoringMetricsSchema,
  getMonitoringBreakdown: GetMonitoringBreakdownSchema,
  getMonitoringBreakdownTimeseries: GetMonitoringBreakdownTimeseriesSchema,
  getMonitoringHistogramTimeseries: GetMonitoringHistogramTimeseriesSchema,
  getMonitoringTimeseries: GetMonitoringTimeseriesSchema,
  listRealtimeDimensions: ListRealtimeDimensionsSchema,
  listRealtimeMetrics: ListRealtimeMetricsSchema,
  getRealtimeBreakdown: GetRealtimeBreakdownSchema,
  getRealtimeHistogramTimeseries: GetRealtimeHistogramTimeseriesSchema,
  getRealtimeTimeseries: GetRealtimeTimeseriesSchema,
  listIncidents: ListIncidentsSchema,
  getIncident: GetIncidentSchema,
  listRelatedIncidents: ListRelatedIncidentsSchema,
  listAnnotations: ListAnnotationsSchema,
  createAnnotation: CreateAnnotationSchema,
  getAnnotation: GetAnnotationSchema,
  updateAnnotation: UpdateAnnotationSchema,
  deleteAnnotation: DeleteAnnotationSchema,
} as const 