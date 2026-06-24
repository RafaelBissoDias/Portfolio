-- Skills reais do Rafael
insert into public.skills (name, category, level, sort_order) values
  -- Frontend
  ('TypeScript', 'Frontend', 5, 1),
  ('JavaScript', 'Frontend', 5, 2),
  ('React.js', 'Frontend', 5, 3),
  ('Next.js', 'Frontend', 4, 4),
  ('HTML5 / CSS3', 'Frontend', 4, 5),
  -- Backend
  ('Node.js', 'Backend', 5, 1),
  ('NestJS', 'Backend', 4, 2),
  ('Python', 'Backend', 4, 3),
  ('FastAPI', 'Backend', 3, 4),
  ('APIs RESTful', 'Backend', 5, 5),
  ('Microsserviços', 'Backend', 4, 6),
  ('PHP', 'Backend', 3, 7),
  -- Banco de Dados
  ('PostgreSQL', 'Banco de Dados', 4, 1),
  ('MongoDB', 'Banco de Dados', 3, 2),
  ('MySQL', 'Banco de Dados', 4, 3),
  ('SQL Server', 'Banco de Dados', 3, 4),
  ('RabbitMQ', 'Banco de Dados', 3, 5),
  -- DevOps & Infra
  ('Docker', 'DevOps & Infra', 5, 1),
  ('Linux', 'DevOps & Infra', 4, 2),
  ('Git / GitHub', 'DevOps & Infra', 5, 3),
  ('CI/CD', 'DevOps & Infra', 4, 4),
  ('Kubernetes', 'DevOps & Infra', 3, 5),
  ('Hardening', 'DevOps & Infra', 4, 6),
  -- Segurança
  ('DevSecOps', 'Segurança', 4, 1),
  ('GRC', 'Segurança', 4, 2),
  ('LGPD', 'Segurança', 4, 3),
  ('IAM', 'Segurança', 4, 4),
  ('DLP / MDM', 'Segurança', 3, 5),
  -- Ferramentas
  ('Power BI', 'Ferramentas', 3, 1),
  ('Figma', 'Ferramentas', 3, 2),
  ('SOLID', 'Ferramentas', 4, 3),
  ('RAG', 'Ferramentas', 3, 4);

-- Projetos baseados no CV
insert into public.projects (title, description, tech_stack, github_url, live_url, featured, sort_order) values
  (
    'Plataforma de Conformidade LGPD',
    'Produto core de autodiagnóstico de conformidade LGPD e gestão de documentos legais para PMEs. Desenvolvimento end-to-end com integrações de RAG para análise de documentos.',
    array['TypeScript', 'React.js', 'Node.js', 'NestJS', 'PostgreSQL', 'Python', 'FastAPI', 'Docker', 'CI/CD'],
    null,
    null,
    true,
    1
  ),
  (
    'Sistema de Check-in de Ativos via QR Code',
    'Sistema interno para controle de check-in e checkout de ativos corporativos via automação com QR Code, com gestão de estoque em formato Kanban.',
    array['PHP', 'MySQL', 'QR Code', 'JavaScript', 'HTML5', 'CSS3'],
    null,
    null,
    true,
    2
  ),
  (
    'Portal GPRIME TV',
    'Desenvolvimento e manutenção do portal web da GPRIME TV, com foco em performance, disponibilidade e experiência do usuário.',
    array['HTML5', 'CSS3', 'JavaScript'],
    null,
    'https://gprime.tv.br/',
    false,
    3
  ),
  (
    'Dashboard de KRIs — Segurança Cibernética',
    'Dashboards executivos em Power BI para monitoramento de KRIs (Key Risk Indicators) e postura de segurança cibernética para relatórios de conformidade regulatória.',
    array['Power BI', 'GRC', 'KRIs'],
    null,
    null,
    false,
    4
  ),
  (
    'Plataformas de Segurança Cibernética',
    'Desenvolvimento fullstack de portais de auditoria digital e sistemas de conformidade com dashboards dinâmicos para gestão de scans de vulnerabilidades e controle de acessos (IAM).',
    array['Next.js', 'React.js', 'Node.js', 'NestJS', 'TypeScript', 'MongoDB', 'RabbitMQ', 'Docker', 'Kubernetes'],
    null,
    null,
    true,
    5
  );
