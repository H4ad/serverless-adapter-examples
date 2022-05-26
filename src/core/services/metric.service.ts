export type Metric = { humidity: number, temperature: number, createdAt: string };
export type CreateMetricBody = Omit<Metric, 'createdAt'>;

export class MetricService {
  //#region Protected Properties

  protected readonly metrics: Metric[] = [];

  //#endregion

  // #region Public Methods

  public getAllMetrics(): Metric[] {
    return this.metrics;
  }

  public createMetric(body: CreateMetricBody): Metric {
    const { humidity, temperature } = body;

    if (!humidity || isNaN(Number(humidity)))
      throw new Error('It is necessary to send the humidity as a valid number.');

    if (!temperature || isNaN(Number(temperature)))
      throw new Error('You must send the temperature as a valid number.');

    const entity: Metric = {
      humidity,
      temperature,
      createdAt: new Date().toISOString(),
    };

    this.metrics.push(entity);

    return entity;
  }

  // #endregion
}
