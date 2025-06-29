import { MuxHandlers } from './handlers.js'
import { muxTools, toolParameterSchemas } from './tools/index.js'
import {
  ListVideoViewsSchema,
  GetVideoViewSchema,
  ListErrorsSchema,
  ListFiltersSchema,
  ListFilterValuesSchema,
  ListDimensionsSchema,
  ListDimensionValuesSchema,
  ListExportsSchema,
  ListExportsViewsSchema,
  ListBreakdownValuesSchema,
  GetOverallValuesSchema,
  ListInsightsSchema,
  GetMetricTimeseriesDataSchema,
  ListAllMetricValuesSchema,
  ListMonitoringDimensionsSchema,
  ListMonitoringMetricsSchema,
  GetMonitoringBreakdownSchema,
  GetMonitoringBreakdownTimeseriesSchema,
  GetMonitoringHistogramTimeseriesSchema,
  GetMonitoringTimeseriesSchema,
  ListRealtimeDimensionsSchema,
  ListRealtimeMetricsSchema,
  GetRealtimeBreakdownSchema,
  GetRealtimeHistogramTimeseriesSchema,
  GetRealtimeTimeseriesSchema,
  ListIncidentsSchema,
  GetIncidentSchema,
  ListRelatedIncidentsSchema,
  ListAnnotationsSchema,
  CreateAnnotationSchema,
  GetAnnotationSchema,
  UpdateAnnotationSchema,
  DeleteAnnotationSchema,
} from './types.js'
import {
  BaseToolManager,
  createAITools as coreCreateVercelAITools,
  createOpenAIFunctions as coreCreateOpenAIFunctions,
  createAnthropicTools as coreCreateAnthropicTools,
  bindHandlerMethods,
} from '@tooly/core'

export * from './types.js'
export * from './tools/index.js'
export * from './handlers.js'

/**
 * Main Mux Tools class for AI SDK integration
 */
export class MuxTools extends BaseToolManager<typeof toolParameterSchemas, typeof muxTools> {
  private handlers: MuxHandlers

  constructor(apiKey: string, baseUrl?: string) {
    super(muxTools, toolParameterSchemas)
    this.handlers = new MuxHandlers(apiKey, baseUrl)
  }

  /**
   * Execute tool function implementation
   */
  protected async executeToolFunction(name: string, params: unknown): Promise<unknown> {
    switch (name) {
      case 'listVideoViews':
        return this.handlers.listVideoViews(ListVideoViewsSchema.parse(params))
      case 'getVideoView':
        return this.handlers.getVideoView(GetVideoViewSchema.parse(params))
      case 'listErrors':
        return this.handlers.listErrors(ListErrorsSchema.parse(params))
      case 'listFilters':
        return this.handlers.listFilters(ListFiltersSchema.parse(params))
      case 'listFilterValues':
        return this.handlers.listFilterValues(ListFilterValuesSchema.parse(params))
      case 'listDimensions':
        return this.handlers.listDimensions(ListDimensionsSchema.parse(params))
      case 'listDimensionValues':
        return this.handlers.listDimensionValues(ListDimensionValuesSchema.parse(params))
      case 'listExports':
        return this.handlers.listExports(ListExportsSchema.parse(params))
      case 'listExportsViews':
        return this.handlers.listExportsViews(ListExportsViewsSchema.parse(params))
      case 'listBreakdownValues':
        return this.handlers.listBreakdownValues(ListBreakdownValuesSchema.parse(params))
      case 'getOverallValues':
        return this.handlers.getOverallValues(GetOverallValuesSchema.parse(params))
      case 'listInsights':
        return this.handlers.listInsights(ListInsightsSchema.parse(params))
      case 'getMetricTimeseriesData':
        return this.handlers.getMetricTimeseriesData(GetMetricTimeseriesDataSchema.parse(params))
      case 'listAllMetricValues':
        return this.handlers.listAllMetricValues(ListAllMetricValuesSchema.parse(params))
      case 'listMonitoringDimensions':
        return this.handlers.listMonitoringDimensions(ListMonitoringDimensionsSchema.parse(params))
      case 'listMonitoringMetrics':
        return this.handlers.listMonitoringMetrics(ListMonitoringMetricsSchema.parse(params))
      case 'getMonitoringBreakdown':
        return this.handlers.getMonitoringBreakdown(GetMonitoringBreakdownSchema.parse(params))
      case 'getMonitoringBreakdownTimeseries':
        return this.handlers.getMonitoringBreakdownTimeseries(GetMonitoringBreakdownTimeseriesSchema.parse(params))
      case 'getMonitoringHistogramTimeseries':
        return this.handlers.getMonitoringHistogramTimeseries(GetMonitoringHistogramTimeseriesSchema.parse(params))
      case 'getMonitoringTimeseries':
        return this.handlers.getMonitoringTimeseries(GetMonitoringTimeseriesSchema.parse(params))
      case 'listRealtimeDimensions':
        return this.handlers.listRealtimeDimensions(ListRealtimeDimensionsSchema.parse(params))
      case 'listRealtimeMetrics':
        return this.handlers.listRealtimeMetrics(ListRealtimeMetricsSchema.parse(params))
      case 'getRealtimeBreakdown':
        return this.handlers.getRealtimeBreakdown(GetRealtimeBreakdownSchema.parse(params))
      case 'getRealtimeHistogramTimeseries':
        return this.handlers.getRealtimeHistogramTimeseries(GetRealtimeHistogramTimeseriesSchema.parse(params))
      case 'getRealtimeTimeseries':
        return this.handlers.getRealtimeTimeseries(GetRealtimeTimeseriesSchema.parse(params))
      case 'listIncidents':
        return this.handlers.listIncidents(ListIncidentsSchema.parse(params))
      case 'getIncident':
        return this.handlers.getIncident(GetIncidentSchema.parse(params))
      case 'listRelatedIncidents':
        return this.handlers.listRelatedIncidents(ListRelatedIncidentsSchema.parse(params))
      case 'listAnnotations':
        return this.handlers.listAnnotations(ListAnnotationsSchema.parse(params))
      case 'createAnnotation':
        return this.handlers.createAnnotation(CreateAnnotationSchema.parse(params))
      case 'getAnnotation':
        return this.handlers.getAnnotation(GetAnnotationSchema.parse(params))
      case 'updateAnnotation':
        return this.handlers.updateAnnotation(UpdateAnnotationSchema.parse(params))
      case 'deleteAnnotation':
        return this.handlers.deleteAnnotation(DeleteAnnotationSchema.parse(params))
      default:
        throw new Error(`Unknown tool: ${name}`)
    }
  }

  /**
   * Get individual handlers for direct use
   */
  getHandlers() {
    return this.handlers
  }
}

/**
 * Create AI SDK compatible tools
 */
export function createAITools(apiKey: string, baseUrl?: string) {
  const muxToolsInstance = new MuxTools(apiKey, baseUrl)
  const handlers = muxToolsInstance.getHandlers()

  const toolDescriptions = {
    listVideoViews: 'List Video Views',
    getVideoView: 'Get a Video View',
    listErrors: 'List Errors',
    listFilters: 'List Filters',
    listFilterValues: 'Lists values for a specific filter',
    listDimensions: 'List Dimensions',
    listDimensionValues: 'Lists the values for a specific dimension',
    listExports: 'List property video view export links',
    listExportsViews: 'List available property view exports',
    listBreakdownValues: 'List breakdown values',
    getOverallValues: 'Get Overall values',
    listInsights: 'List Insights',
    getMetricTimeseriesData: 'Get metric timeseries data',
    listAllMetricValues: 'List all metric values',
    listMonitoringDimensions: 'List Monitoring Dimensions',
    listMonitoringMetrics: 'List Monitoring Metrics',
    getMonitoringBreakdown: 'Get Monitoring Breakdown',
    getMonitoringBreakdownTimeseries: 'Get Monitoring Breakdown Timeseries',
    getMonitoringHistogramTimeseries: 'Get Monitoring Histogram Timeseries',
    getMonitoringTimeseries: 'Get Monitoring Timeseries',
    listRealtimeDimensions: 'List Real-Time Dimensions',
    listRealtimeMetrics: 'List Real-Time Metrics',
    getRealtimeBreakdown: 'Get Real-Time Breakdown',
    getRealtimeHistogramTimeseries: 'Get Real-Time Histogram Timeseries',
    getRealtimeTimeseries: 'Get Real-Time Timeseries',
    listIncidents: 'List Incidents',
    getIncident: 'Get an Incident',
    listRelatedIncidents: 'List Related Incidents',
    listAnnotations: 'List Annotations',
    createAnnotation: 'Create Annotation',
    getAnnotation: 'Get Annotation',
    updateAnnotation: 'Update Annotation',
    deleteAnnotation: 'Delete Annotation',
  }

  const boundMethods = bindHandlerMethods(handlers, [
    'listVideoViews',
    'getVideoView',
    'listErrors',
    'listFilters',
    'listFilterValues',
    'listDimensions',
    'listDimensionValues',
    'listExports',
    'listExportsViews',
    'listBreakdownValues',
    'getOverallValues',
    'listInsights',
    'getMetricTimeseriesData',
    'listAllMetricValues',
    'listMonitoringDimensions',
    'listMonitoringMetrics',
    'getMonitoringBreakdown',
    'getMonitoringBreakdownTimeseries',
    'getMonitoringHistogramTimeseries',
    'getMonitoringTimeseries',
    'listRealtimeDimensions',
    'listRealtimeMetrics',
    'getRealtimeBreakdown',
    'getRealtimeHistogramTimeseries',
    'getRealtimeTimeseries',
    'listIncidents',
    'getIncident',
    'listRelatedIncidents',
    'listAnnotations',
    'createAnnotation',
    'getAnnotation',
    'updateAnnotation',
    'deleteAnnotation',
  ])

  return coreCreateVercelAITools(muxToolsInstance, boundMethods, toolDescriptions)
}

/**
 * Helper function to create OpenAI function calling setup
 */
export function createOpenAIFunctions(apiKey: string, baseUrl?: string) {
  const muxToolsInstance = new MuxTools(apiKey, baseUrl)
  return coreCreateOpenAIFunctions(muxToolsInstance)
}

/**
 * Helper function to create Anthropic function calling setup
 */
export function createAnthropicTools(apiKey: string, baseUrl?: string) {
  const muxToolsInstance = new MuxTools(apiKey, baseUrl)
  return coreCreateAnthropicTools(muxToolsInstance)
}

// Default export
export default MuxTools 