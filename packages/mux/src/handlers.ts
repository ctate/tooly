import { listVideoViews } from './tools/index.js'
import { getVideoView } from './tools/index.js'
import { listErrors } from './tools/index.js'
import { listFilters } from './tools/index.js'
import { listFilterValues } from './tools/index.js'
import { listDimensions } from './tools/index.js'
import { listDimensionValues } from './tools/index.js'
import { listExports } from './tools/index.js'
import { listExportsViews } from './tools/index.js'
import { listBreakdownValues } from './tools/index.js'
import { getOverallValues } from './tools/index.js'
import { listInsights } from './tools/index.js'
import { getMetricTimeseriesData } from './tools/index.js'
import { listAllMetricValues } from './tools/index.js'
import { listMonitoringDimensions } from './tools/index.js'
import { listMonitoringMetrics } from './tools/index.js'
import { getMonitoringBreakdown } from './tools/index.js'
import { getMonitoringBreakdownTimeseries } from './tools/index.js'
import { getMonitoringHistogramTimeseries } from './tools/index.js'
import { getMonitoringTimeseries } from './tools/index.js'
import { listRealtimeDimensions } from './tools/index.js'
import { listRealtimeMetrics } from './tools/index.js'
import { getRealtimeBreakdown } from './tools/index.js'
import { getRealtimeHistogramTimeseries } from './tools/index.js'
import { getRealtimeTimeseries } from './tools/index.js'
import { listIncidents } from './tools/index.js'
import { getIncident } from './tools/index.js'
import { listRelatedIncidents } from './tools/index.js'
import { listAnnotations } from './tools/index.js'
import { createAnnotation } from './tools/index.js'
import { getAnnotation } from './tools/index.js'
import { updateAnnotation } from './tools/index.js'
import { deleteAnnotation } from './tools/index.js'
import type {
  ListVideoViewsParams,
  ListVideoViewsResponse,
  GetVideoViewParams,
  GetVideoViewResponse,
  ListErrorsParams,
  ListErrorsResponse,
  ListFiltersParams,
  ListFiltersResponse,
  ListFilterValuesParams,
  ListFilterValuesResponse,
  ListDimensionsParams,
  ListDimensionsResponse,
  ListDimensionValuesParams,
  ListDimensionValuesResponse,
  ListExportsParams,
  ListExportsResponse,
  ListExportsViewsParams,
  ListExportsViewsResponse,
  ListBreakdownValuesParams,
  ListBreakdownValuesResponse,
  GetOverallValuesParams,
  GetOverallValuesResponse,
  ListInsightsParams,
  ListInsightsResponse,
  GetMetricTimeseriesDataParams,
  GetMetricTimeseriesDataResponse,
  ListAllMetricValuesParams,
  ListAllMetricValuesResponse,
  ListMonitoringDimensionsParams,
  ListMonitoringDimensionsResponse,
  ListMonitoringMetricsParams,
  ListMonitoringMetricsResponse,
  GetMonitoringBreakdownParams,
  GetMonitoringBreakdownResponse,
  GetMonitoringBreakdownTimeseriesParams,
  GetMonitoringBreakdownTimeseriesResponse,
  GetMonitoringHistogramTimeseriesParams,
  GetMonitoringHistogramTimeseriesResponse,
  GetMonitoringTimeseriesParams,
  GetMonitoringTimeseriesResponse,
  ListRealtimeDimensionsParams,
  ListRealtimeDimensionsResponse,
  ListRealtimeMetricsParams,
  ListRealtimeMetricsResponse,
  GetRealtimeBreakdownParams,
  GetRealtimeBreakdownResponse,
  GetRealtimeHistogramTimeseriesParams,
  GetRealtimeHistogramTimeseriesResponse,
  GetRealtimeTimeseriesParams,
  GetRealtimeTimeseriesResponse,
  ListIncidentsParams,
  ListIncidentsResponse,
  GetIncidentParams,
  GetIncidentResponse,
  ListRelatedIncidentsParams,
  ListRelatedIncidentsResponse,
  ListAnnotationsParams,
  ListAnnotationsResponse,
  CreateAnnotationParams,
  CreateAnnotationResponse,
  GetAnnotationParams,
  GetAnnotationResponse,
  UpdateAnnotationParams,
  UpdateAnnotationResponse,
  DeleteAnnotationParams,
  DeleteAnnotationResponse,
} from './types'

export class MuxHandlers {
  private apiKey: string
  private baseUrl: string

  constructor(apiKey: string, baseUrl?: string) {
    this.apiKey = apiKey
    this.baseUrl = baseUrl || 'https://api.mux.com'
  }

  /**
   * List Video Views
   * Returns a list of video views which match the filters and have a &#x60;view_end&#x60; within the specified timeframe.
   */
     async listVideoViews(params: ListVideoViewsParams): Promise<ListVideoViewsResponse> {
     return listVideoViews(this.apiKey, this.baseUrl, params)
   }

  /**
   * Get a Video View
   * Returns the details of a video view.
   */
     async getVideoView(params: GetVideoViewParams): Promise<GetVideoViewResponse> {
     return getVideoView(this.apiKey, this.baseUrl, params)
   }

  /**
   * List Errors
   * Returns a list of errors.
   */
     async listErrors(params: ListErrorsParams): Promise<ListErrorsResponse> {
     return listErrors(this.apiKey, this.baseUrl, params)
   }

  /**
   * List Filters
   * The API has been replaced by the list-dimensions API call.

Lists all the filters broken out into basic and advanced.

   */
     async listFilters(params: ListFiltersParams): Promise<ListFiltersResponse> {
     return listFilters(this.apiKey, this.baseUrl, params)
   }

  /**
   * Lists values for a specific filter
   * The API has been replaced by the list-dimension-values API call.

Lists the values for a filter along with a total count of related views.

   */
     async listFilterValues(params: ListFilterValuesParams): Promise<ListFilterValuesResponse> {
     return listFilterValues(this.apiKey, this.baseUrl, params)
   }

  /**
   * List Dimensions
   * List all available dimensions.

Note: This API replaces the list-filters API call.

   */
     async listDimensions(params: ListDimensionsParams): Promise<ListDimensionsResponse> {
     return listDimensions(this.apiKey, this.baseUrl, params)
   }

  /**
   * Lists the values for a specific dimension
   * Lists the values for a dimension along with a total count of related views.

Note: This API replaces the list-filter-values API call.

   */
     async listDimensionValues(params: ListDimensionValuesParams): Promise<ListDimensionValuesResponse> {
     return listDimensionValues(this.apiKey, this.baseUrl, params)
   }

  /**
   * List property video view export links
   * The API has been replaced by the list-exports-views API call.

Lists the available video view exports along with URLs to retrieve them.

   */
     async listExports(params: ListExportsParams): Promise<ListExportsResponse> {
     return listExports(this.apiKey, this.baseUrl, params)
   }

  /**
   * List available property view exports
   * Lists the available video view exports along with URLs to retrieve them.
   */
     async listExportsViews(params: ListExportsViewsParams): Promise<ListExportsViewsResponse> {
     return listExportsViews(this.apiKey, this.baseUrl, params)
   }

  /**
   * List breakdown values
   * List the breakdown values for a specific metric.
   */
     async listBreakdownValues(params: ListBreakdownValuesParams): Promise<ListBreakdownValuesResponse> {
     return listBreakdownValues(this.apiKey, this.baseUrl, params)
   }

  /**
   * Get Overall values
   * Returns the overall value for a specific metric, as well as the total view count, watch time, and the Mux Global metric value for the metric.
   */
     async getOverallValues(params: GetOverallValuesParams): Promise<GetOverallValuesResponse> {
     return getOverallValues(this.apiKey, this.baseUrl, params)
   }

  /**
   * List Insights
   * Returns a list of insights for a metric. These are the worst performing values across all breakdowns sorted by how much they negatively impact a specific metric.
   */
     async listInsights(params: ListInsightsParams): Promise<ListInsightsResponse> {
     return listInsights(this.apiKey, this.baseUrl, params)
   }

  /**
   * Get metric timeseries data
   * Returns timeseries data for a specific metric.

Each interval represented in the data array contains an array with the following values:
  * the first element is the interval time
  * the second element is the calculated metric value
  * the third element is the number of views in the interval that have a valid metric value

   */
     async getMetricTimeseriesData(params: GetMetricTimeseriesDataParams): Promise<GetMetricTimeseriesDataResponse> {
     return getMetricTimeseriesData(this.apiKey, this.baseUrl, params)
   }

  /**
   * List all metric values
   * List all of the values across every breakdown for a specific metric.
   */
     async listAllMetricValues(params: ListAllMetricValuesParams): Promise<ListAllMetricValuesResponse> {
     return listAllMetricValues(this.apiKey, this.baseUrl, params)
   }

  /**
   * List Monitoring Dimensions
   * Lists available monitoring dimensions.
   */
     async listMonitoringDimensions(params: ListMonitoringDimensionsParams): Promise<ListMonitoringDimensionsResponse> {
     return listMonitoringDimensions(this.apiKey, this.baseUrl, params)
   }

  /**
   * List Monitoring Metrics
   * Lists available monitoring metrics.
   */
     async listMonitoringMetrics(params: ListMonitoringMetricsParams): Promise<ListMonitoringMetricsResponse> {
     return listMonitoringMetrics(this.apiKey, this.baseUrl, params)
   }

  /**
   * Get Monitoring Breakdown
   * Gets breakdown information for a specific dimension and metric along with the number of concurrent viewers and negative impact score.
   */
     async getMonitoringBreakdown(params: GetMonitoringBreakdownParams): Promise<GetMonitoringBreakdownResponse> {
     return getMonitoringBreakdown(this.apiKey, this.baseUrl, params)
   }

  /**
   * Get Monitoring Breakdown Timeseries
   * Gets timeseries of breakdown information for a specific dimension and metric. Each datapoint in the response represents 5 seconds worth of data.
   */
     async getMonitoringBreakdownTimeseries(params: GetMonitoringBreakdownTimeseriesParams): Promise<GetMonitoringBreakdownTimeseriesResponse> {
     return getMonitoringBreakdownTimeseries(this.apiKey, this.baseUrl, params)
   }

  /**
   * Get Monitoring Histogram Timeseries
   * Gets histogram timeseries information for a specific metric.
   */
     async getMonitoringHistogramTimeseries(params: GetMonitoringHistogramTimeseriesParams): Promise<GetMonitoringHistogramTimeseriesResponse> {
     return getMonitoringHistogramTimeseries(this.apiKey, this.baseUrl, params)
   }

  /**
   * Get Monitoring Timeseries
   * Gets Time series information for a specific metric along with the number of concurrent viewers.
   */
     async getMonitoringTimeseries(params: GetMonitoringTimeseriesParams): Promise<GetMonitoringTimeseriesResponse> {
     return getMonitoringTimeseries(this.apiKey, this.baseUrl, params)
   }

  /**
   * List Real-Time Dimensions
   * Lists available real-time dimensions. This API is now deprecated, please use the &#x60;List Monitoring Dimensions&#x60; API.
   */
     async listRealtimeDimensions(params: ListRealtimeDimensionsParams): Promise<ListRealtimeDimensionsResponse> {
     return listRealtimeDimensions(this.apiKey, this.baseUrl, params)
   }

  /**
   * List Real-Time Metrics
   * Lists available real-time metrics. This API is now deprecated, please use the &#x60;List Monitoring Metrics&#x60; API.
   */
     async listRealtimeMetrics(params: ListRealtimeMetricsParams): Promise<ListRealtimeMetricsResponse> {
     return listRealtimeMetrics(this.apiKey, this.baseUrl, params)
   }

  /**
   * Get Real-Time Breakdown
   * Gets breakdown information for a specific dimension and metric along with the number of concurrent viewers and negative impact score. This API is now deprecated, please use the &#x60;Get Monitoring Breakdown&#x60; API.
   */
     async getRealtimeBreakdown(params: GetRealtimeBreakdownParams): Promise<GetRealtimeBreakdownResponse> {
     return getRealtimeBreakdown(this.apiKey, this.baseUrl, params)
   }

  /**
   * Get Real-Time Histogram Timeseries
   * Gets histogram timeseries information for a specific metric. This API is now deprecated, please use the &#x60;Get Monitoring Histogram Timeseries&#x60; API.
   */
     async getRealtimeHistogramTimeseries(params: GetRealtimeHistogramTimeseriesParams): Promise<GetRealtimeHistogramTimeseriesResponse> {
     return getRealtimeHistogramTimeseries(this.apiKey, this.baseUrl, params)
   }

  /**
   * Get Real-Time Timeseries
   * Gets Time series information for a specific metric along with the number of concurrent viewers. This API is now deprecated, please use the &#x60;Get Monitoring Timeseries&#x60; API.
   */
     async getRealtimeTimeseries(params: GetRealtimeTimeseriesParams): Promise<GetRealtimeTimeseriesResponse> {
     return getRealtimeTimeseries(this.apiKey, this.baseUrl, params)
   }

  /**
   * List Incidents
   * Returns a list of incidents.
   */
     async listIncidents(params: ListIncidentsParams): Promise<ListIncidentsResponse> {
     return listIncidents(this.apiKey, this.baseUrl, params)
   }

  /**
   * Get an Incident
   * Returns the details of an incident.
   */
     async getIncident(params: GetIncidentParams): Promise<GetIncidentResponse> {
     return getIncident(this.apiKey, this.baseUrl, params)
   }

  /**
   * List Related Incidents
   * Returns all the incidents that seem related to a specific incident.
   */
     async listRelatedIncidents(params: ListRelatedIncidentsParams): Promise<ListRelatedIncidentsResponse> {
     return listRelatedIncidents(this.apiKey, this.baseUrl, params)
   }

  /**
   * List Annotations
   * Returns a list of annotations.
   */
     async listAnnotations(params: ListAnnotationsParams): Promise<ListAnnotationsResponse> {
     return listAnnotations(this.apiKey, this.baseUrl, params)
   }

  /**
   * Create Annotation
   * Creates a new annotation.
   */
     async createAnnotation(params: CreateAnnotationParams): Promise<CreateAnnotationResponse> {
     return createAnnotation(this.apiKey, this.baseUrl, params)
   }

  /**
   * Get Annotation
   * Returns the details of a specific annotation.
   */
     async getAnnotation(params: GetAnnotationParams): Promise<GetAnnotationResponse> {
     return getAnnotation(this.apiKey, this.baseUrl, params)
   }

  /**
   * Update Annotation
   * Updates an existing annotation.
   */
     async updateAnnotation(params: UpdateAnnotationParams): Promise<UpdateAnnotationResponse> {
     return updateAnnotation(this.apiKey, this.baseUrl, params)
   }

  /**
   * Delete Annotation
   * Deletes an annotation.
   */
     async deleteAnnotation(params: DeleteAnnotationParams): Promise<DeleteAnnotationResponse> {
     return deleteAnnotation(this.apiKey, this.baseUrl, params)
   }

} 